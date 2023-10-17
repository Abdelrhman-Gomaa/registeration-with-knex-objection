import { Body, Controller, Get, Post, Res,UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PostService } from './post.service';
import { CreatePostInput } from './input/create-post.input';
import { CurrentUserId } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(private  postService: PostService) { }

  @UseGuards(AuthGuard)
  @Post('/createPost')
  async createPost(
    @Body() input: CreatePostInput,
     @Res() res: Response,
      @CurrentUserId() userId:string
  ): Promise<Response> {
    await this.postService.checkPost();
    try {
      const post = await this.postService.createPost(input, userId);
      return res.status(201).json({ message: 'post created successfully!', post });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while creating post.' });
    }
  }
}