import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants'; // Ensure to define your JWT constants

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  override getRequest(context: ExecutionContext) {
    switch (context.getType<GqlContextType>()) {
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
      default: // 'http' | 'ws' | 'rpc'
        return context.switchToHttp().getRequest();
    }
  }
}