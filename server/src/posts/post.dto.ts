import { ObjectID } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { PostEntity } from './post.entity';

@ObjectType()
export class PostDTO extends PostEntity {
}

