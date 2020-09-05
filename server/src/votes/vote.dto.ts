import { ObjectType }from '@nestjs/graphql'
import { VoteEntity } from './votes.entity'
@ObjectType()
export class VoteDTO extends VoteEntity {
}