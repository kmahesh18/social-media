import { Controller, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  followUser(@Param('userId') userId: string, @Request() req) {
    return this.followService.followUser(req.user.userId, userId); // Changed from req.user.id
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  unfollowUser(@Param('userId') userId: string, @Request() req) {
    return this.followService.unfollowUser(req.user.userId, userId); // Changed from req.user.id
  }
}
