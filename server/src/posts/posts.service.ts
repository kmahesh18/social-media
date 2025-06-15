import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { UsersService } from '../users/users.service';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private usersService: UsersService,
  ) {}

  async create(title: string, description: string, userId: string): Promise<PostDocument> {
    const user = await this.usersService.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const createdPost = new this.postModel({
      title,
      description,
      author: new Types.ObjectId(userId),
      authorUsername: user.username,
    });
    return createdPost.save();
  }
 
  async getTimelinePosts(userId: string): Promise<PostDocument[]> {
    const user = await this.usersService.findById(userId);
    // Ensure followingIds is always an array, even if user is not found or has no followings
    const followingIds = user?.following || [];
    
    // Include the user's own posts in the timeline
    followingIds.push(userId);
    
    // Convert string IDs to ObjectIds
    const objectIds = followingIds.map(id => new Types.ObjectId(id));
    
    return this.postModel
      .find({ author: { $in: objectIds } })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getUserPosts(userId: string): Promise<PostDocument[]> {
    return this.postModel
      .find({ author: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getAllPosts(): Promise<PostDocument[]> {
    return this.postModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }

  async getPostById(postId: string): Promise<PostDocument> {
    const post = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async likePost(postId: string, userId: string): Promise<PostDocument> {
    const post = await this.getPostById(postId);
    
    const userObjectId = new Types.ObjectId(userId);
    // Check using string comparison or convert existing ObjectIds to strings for comparison
    if (!post.likes.some(id => id.toString() === userId)) {
      post.likes.push(userObjectId);
      await post.save();
    }
    
    return post;
  }

  async unlikePost(postId: string, userId: string): Promise<PostDocument> {
    const post = await this.getPostById(postId);
    
    // Find and remove the like using string comparison
    post.likes = post.likes.filter(id => id.toString() !== userId);
    await post.save();
    
    return post;
  }

  async addComment(postId: string, userId: string, text: string): Promise<PostDocument> {
    const post = await this.getPostById(postId);
    const user = await this.usersService.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const comment: Comment = {
      text,
      author: new Types.ObjectId(userId),
      authorUsername: user.username,
      createdAt: new Date(),
    };
    
    post.comments.push(comment);
    await post.save();
    
    return post;
  }
}
