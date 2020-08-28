import { Module } from '@nestjs/common';

import { PostEntity } from './post.entity';
import { UserEntity } from '../users/user.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { UserService } from '../users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  providers: [PostResolver, PostService, UserService],
})
export class PostsModule {}