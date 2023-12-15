import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        rateLimit: true,
        jwksUri: `${_configService.get<string>(
          'AUTH0_ISSUER_URL',
        )}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: _configService.get<string>('AUTH0_AUDIENCE'),
      issuer: `${_configService.get<string>('AUTH0_ISSUER_URL')}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return { _id: payload._id, email: payload.email, name: payload.name };
  }
}
