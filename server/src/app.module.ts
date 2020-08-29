import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLErrorFilter } from './shared/filters/graphql-exception.filter';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { UsersModule } from './users/user.module';
import { PostsModule } from './posts/post.module';
import { redis } from './shared/utils/redis';
import { RedisCache } from 'apollo-server-cache-redis';

const ormconfig = require('../ormconfig.json');
import { config } from './shared/config'
import { VotesModule } from './votes/votes.module';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      persistedQueries: {
        ttl: config.PERSISTED_QUERY_TTL as unknown as number, // 1h
        cache: new RedisCache({
          host: config.REDIS_URL,
        }),
      },
      context: ({ request }) => ({ headers: request.headers}),
      debug: true,
      installSubscriptionHandlers: true,
    }),

    TypeOrmModule.forRoot(ormconfig[0]),
    UsersModule,
    PostsModule,
    VotesModule,
    CommentsModule,
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },

    {
      provide: APP_FILTER,
      useClass: GraphQLErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
