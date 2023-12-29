import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import { AppModule } from './app/app.module';

function checkEnvironment(configService: ConfigService) {
  const requiredEnvVars = [
    'DATABASE_URL',
    'PORT',
    'ISSUER_BASE_URL',
    'AUDIENCE',
    'CLIENT_ORIGIN_URL',
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!configService.get<string>(envVar)) {
      throw Error(`Undefined environment variable: ${envVar}`);
    }
  });
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  checkEnvironment(configService);

  app.use(
    cors<cors.CorsRequest>({
      origin: ['http://localhost:3000', 'http://localhost:4200'],
      credentials: true,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );

  await app.listen(4200);
}
bootstrap();
