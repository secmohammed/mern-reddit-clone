import { ObjectType } from '@nestjs/graphql'
import { CommentEntity } from './comments.entity'
@ObjectType()
export class CommentDTO extends CommentEntity {

}