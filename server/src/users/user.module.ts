import { Module } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PostService} from '../posts/post.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import  { PostEntity } from '../posts/post.entity'
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity])],
  providers: [UserResolver, UserService, PostService],
})
export class UsersModule {}