import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { env } from 'process';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { RoleService } from './role/role.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Automatically validate routes and use whitelist to strip unspecified params
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Parse & attach cookies to requests
  app.use(cookieParser());

  // Secure HTTP headers
  app.use(helmet({ contentSecurityPolicy: false }));

  // Use compression
  app.use(compression());

  // Proper Prisma shutdown hooks
  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Setup initial roles (user, admin) if they don't exist
  const roleService = new RoleService(prismaService);
  roleService.setupRoles();

  // Put all routes under /api since we're also serving a client on /
  app.setGlobalPrefix('api');

  // If we're not in production
  if (env.ENVIRONMENT !== 'prod') {
    // Setup swagger docs
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Doperad Starter')
      .setDescription('Your Swagger documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, swaggerDocument);

    // Enable cors
    app.enableCors({
      // Add your clients here
      origin: ['http://localhost:3000'],
      credentials: true,
    });
  }

  await app.listen(env.PORT || 3117);
}
bootstrap();
