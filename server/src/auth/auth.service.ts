import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { email: user?.email, sub: user?._id, username: user?.username };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user?._id, email: user?.email, username: user?.username },
    };
  }

  async signup(email: string, password: string, username: string) {
    const user = await this.usersService.create(email, password, username);
    const payload = { email: user.email, sub: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user._id, email: user.email, username: user.username },
    };
  }
}
