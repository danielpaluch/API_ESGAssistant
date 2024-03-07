import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as nocache from 'nocache';
import { AppModule } from './app/app.module';

function checkEnvironment(configService: ConfigService) {
  const requiredEnvVars = [
    'DATABASE_URL',
    'PORT',
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!configService.get<string>(envVar)) {
      throw Error(`Undefined environment variable: ${envVar}`);
    }
  });
}

async function bootstrap() {
  console.log('started');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  checkEnvironment(configService);

  app.use(nocache());

  app.use(
    cors<cors.CorsRequest>({
      origin: [
        configService.get<string>('CLIENT_ORIGIN_URL'),
        'http://localhost:4200',
      ],
      credentials: true,
      allowedHeaders: ['Authorization', 'Content-Type'],
      maxAge: 86400,
    }),
  );

  if (configService.get<string>('NODE_ENV') !== 'development') {
    app.use(
      helmet({
        hsts: { maxAge: 31536000 },
        frameguard: { action: 'deny' },
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: {
          directives: {
            'default-src': ["'self'"],
            'frame-ancestors': ["'none'"],
            imgSrc: [
              `'self'`,
              'data:',
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            manifestSrc: [
              `'self'`,
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
          },
        },
      }),
    );
  }

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
