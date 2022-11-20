import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Put,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Post as PostModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CreateDraftRequestDto } from './dto/create-draft-request.dto';
import { FindOnePostDto } from './dto/findOnePostDto.dto';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('feed')
  @ApiOperation({ summary: 'Get list of posts' })
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      orderBy: { id: 'desc' },
      where: { published: true },
    });
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Post found' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiOperation({ summary: 'Get post by id' })
  async getPostById(
    @Request() req,
    @Param() params: FindOnePostDto,
  ): Promise<PostModel> {
    const post = await this.postService.post({ id: Number(params.id) });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Get('search/:searchString')
  @ApiOperation({
    summary: 'Get a list of posts by search query (searches title and content)',
  })
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new draft' })
  async createDraft(
    @Request() req,
    @Body()
    createDraftRequest: CreateDraftRequestDto,
  ): Promise<PostModel> {
    const { title, content } = createDraftRequest;

    return await this.postService.createPost({
      title,
      content,
      author: {
        connect: { id: req.user.userId },
      },
    });
  }

  @Put('publish/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Post successfully published' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized user' })
  @ApiOperation({ summary: 'Publish a draft' })
  async publishPosts(
    @Request() req,
    @Param() params: FindOnePostDto,
  ): Promise<PostModel> {
    const post = await this.getPostById(req, params);

    if (!post) throw new NotFoundException();

    if (post.authorId !== req.user.userId) throw new UnauthorizedException();

    return this.postService.updatePost({
      where: { id: Number(params.id) },
      data: { published: true },
    });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Post successfully deleted' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized user' })
  @ApiOperation({ summary: 'Delete a post' })
  async deletePost(
    @Request() req,
    @Param() params: FindOnePostDto,
  ): Promise<PostModel> {
    const post = await this.getPostById(req, params);

    if (!post) throw new NotFoundException();

    if (post.authorId !== req.user.userId) throw new UnauthorizedException();

    return this.postService.deletePost({ id: Number(params.id) });
  }
}
