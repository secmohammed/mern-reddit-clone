import { ObjectType, Field, ID }from '@nestjs/graphql'
import { PostEntity } from '../posts/post.entity'
import { UserEntity } from '../users/user.entity';
import { VoteEntity } from './votes.entity'
@ObjectType()
export class VoteDTO extends VoteEntity {
}