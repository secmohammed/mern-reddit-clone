import { Module } from '@nestjs/common';

import { PostEntity } from './post.entity';
import { UserEntity } from '../users/user.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { UserService } from '../users/user.service';
import { VotesService } from '../votes/votes.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteEntity } from '../votes/votes.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, VoteEntity])],
  providers: [PostResolver, PostService, UserService, VotesService],
})
export class PostsModule {}