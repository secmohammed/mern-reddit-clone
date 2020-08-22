
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

import { ValidationPipe } from './shared/pipes/validation.pipe';
import { redis } from './shared/utils/redis';
import 'dotenv/config';

import { config } from './shared/config'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const fastify = new FastifyAdapter({ logger: config.APP_ENV !== "production" });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
  );

  fastify.register(require('fastify-rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
    redis,
    whitelist: [config.APP_URL],
    addHeaders: {
    'x-ratelimit-limit': true,
    'x-ratelimit-remaining': true,
    'x-ratelimit-reset': true,
    'retry-after': true
  }
  });
  app.use(helmet());


  app.use(helmet.noSniff());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'"],
      },
    }),
  );

  app.use(helmet.ieNoOpen());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  app.listen(3000).then(() => console.log('graphql started on http://localhost:3000/graphql'));
}
bootstrap();