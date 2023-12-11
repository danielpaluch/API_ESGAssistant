import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as cors from 'cors';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.use(
    cors<cors.CorsRequest>({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

  await app.listen(4200, (err: Error, appUri: string) => {
    if (err) {
      console.log(err);

      return;
    }

    const logger = new Logger();

    logger.log(`Server started at ${appUri}`);
    logger.log(`GraphQL URL ${appUri + '/graphql'}`);
  });
}
bootstrap();
