import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';
import { RoleModule } from './role/role.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  controllers: [PostController, AuthController, UserController],
  providers: [PrismaService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),
    AuthModule,
    UserModule,
    PostModule,
    RoleModule,
  ],
})
export class AppModule {}
