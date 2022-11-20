import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  exports: [UserService],
  providers: [UserService, PrismaService],
})
export class UserModule {}
