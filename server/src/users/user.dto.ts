import { ObjectID } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';

@ObjectType()
export class UserDTO extends UserEntity {
  @Field()
  auth_token: string;
}

export interface AuthToken {
  id: ObjectID;
}