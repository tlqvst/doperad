import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { PostService } from './post.service';

@Module({
  exports: [PostService],
  providers: [PostService, PrismaService, UserService],
})
export class PostModule {}
