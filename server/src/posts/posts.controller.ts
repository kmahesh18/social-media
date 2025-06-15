import { Controller, Get, Post, Body, UseGuards, Request, Param, Delete, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: { title: string; description: string }, @Request() req) {
    return this.postsService.create(
      createPostDto.title, 
      createPostDto.description, 
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('timeline')
  getTimeline(@Request() req) {
    return this.postsService.getTimelinePosts(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  getMyPosts(@Request() req) {
    return this.postsService.getUserPosts(req.user.userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllPosts() {
    return this.postsService.getAllPosts();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  likePost(@Param('id') id: string, @Request() req) {
    return this.postsService.likePost(id, req.user.userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  unlikePost(@Param('id') id: string, @Request() req) {
    return this.postsService.unlikePost(id, req.user.userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  addComment(
    @Param('id') id: string, 
    @Body() commentDto: { text: string }, 
    @Request() req,
  ) {
    return this.postsService.addComment(id, req.user.userId, commentDto.text);
  }
}
