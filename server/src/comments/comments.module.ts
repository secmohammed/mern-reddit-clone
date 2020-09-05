import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { CommentEntity } from './comments.entity'
import { UserEntity  } from '../users/user.entity'
import { PostEntity } from '../posts/post.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VotesService } from '../votes/votes.service'
import { VoteEntity } from '../votes/votes.entity'
import { PostService } from '../posts/post.service'
@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, PostEntity, VoteEntity, ])],
  providers: [CommentsService, CommentsResolver, VotesService, PostService]
})
export class CommentsModule {}
