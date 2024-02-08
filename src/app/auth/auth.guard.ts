import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GetVerificationKey, expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {
  private ISSUER_BASE_URL: string;
  private AUDIENCE: string;
  constructor(private configService: ConfigService) {
    this.ISSUER_BASE_URL = this.configService.get('ISSUER_BASE_URL');
    this.AUDIENCE = this.configService.get('AUDIENCE');
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const res = ctx.getContext().res;
    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.ISSUER_BASE_URL}.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: this.AUDIENCE,
        issuer: this.ISSUER_BASE_URL,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJwt(req, res);
      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
