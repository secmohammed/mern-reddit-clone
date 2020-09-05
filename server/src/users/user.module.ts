import { Module } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PostService} from '../posts/post.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import  { PostEntity } from '../posts/post.entity'
import { CommentEntity } from '../comments/comments.entity'
import { ChannelEntity } from '../channels/channels.entity'
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity, CommentEntity, ChannelEntity])],
  providers: [UserResolver, UserService, PostService],
})
export class UsersModule {}