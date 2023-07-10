import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { ErrorCode } from '../app.errors';
import { UsersService } from './users.service';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new UnauthorizedException(
        'Missing authentication header.',
        ErrorCode.UNAUTHORIZED,
      );
    }

    const [, token] = request.headers.authorization?.split('Bearer ');

    if (!token) {
      throw new UnauthorizedException('Invalid token.', ErrorCode.UNAUTHORIZED);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const userId = payload.sub;

      const user = await this.userService.findById(userId);

      if (!user) {
        throw new Error();
      }

      request['user'] = user;
    } catch {
      throw new UnauthorizedException('Invalid token.', ErrorCode.UNAUTHORIZED);
    }

    return true;
  }
}
