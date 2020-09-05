import { Module } from '@nestjs/common';
import { VotesResolver } from './votes.resolver';
import { VotesService } from './votes.service';
import { PostEntity } from '../posts/post.entity'
import { UserEntity } from '../users/user.entity'
import { TypeOrmModule} from '@nestjs/typeorm'
import { UserService } from '../users/user.service'
import { PostService } from '../posts/post.service'
import { VoteEntity } from './votes.entity'
import { CommentsService}  from '../comments/comments.service'
import { CommentEntity } from '../comments/comments.entity'
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, VoteEntity, CommentEntity])],
  providers: [VotesResolver, VotesService, UserService, PostService, CommentsService]
})
export class VotesModule {}
