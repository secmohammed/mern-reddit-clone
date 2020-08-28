import { Module } from '@nestjs/common';
import { VotesResolver } from './votes.resolver';
import { VotesService } from './votes.service';
import { PostEntity } from '../posts/post.entity'
import { UserEntity } from '../users/user.entity'
import { TypeOrmModule} from '@nestjs/typeorm'
import { UserService } from '../users/user.service'
import { PostService } from '../posts/post.service'
import { VoteEntity } from './votes.entity'
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, VoteEntity])],
  providers: [VotesResolver, VotesService, UserService, PostService]
})
export class VotesModule {}
