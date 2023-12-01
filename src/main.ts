import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    credentials: true,
    origin: '*',
  });

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
