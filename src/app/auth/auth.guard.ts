import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard')
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    console.log('Request', request)
    const token = this.extractTokenFromHeader(request);
    if(!token) {
      throw new UnauthorizedException()
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined  {
      const [type, token] = request.headers.authorization.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
  }
}