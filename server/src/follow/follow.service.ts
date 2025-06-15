import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class FollowService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async followUser(currentUserId: string, targetUserId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: targetUserId },
    });
    await this.userModel.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: currentUserId },
    });
  }

  async unfollowUser(currentUserId: string, targetUserId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetUserId },
    });
    await this.userModel.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUserId },
    });
  }
}
