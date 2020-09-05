import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { VoteDTO } from './vote.dto';
import { PostEntity } from '../posts/post.entity';
export enum Status {
  Up = 'up',
  Down = 'down',
}
export enum VoteableType {
  Post = 'post',
  Comment = 'comment',
}
@ObjectType('votes')
@Entity('votes')
export class VoteEntity extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('enum', { enum: VoteableType, default: 'post' })
  @Field()
  voteableType: string;
  @Column('uuid')
  @Field(() => ID!)
  voteableId: string;

  @ManyToOne(
    type => UserEntity,
    user => user.votes,
  )
  @Field(() => UserEntity, { defaultValue: {} })
  user: Promise<UserEntity>;
  @Column('uuid')
  userId: string;
  @Field()
  @Column('enum', { enum: Status, default: 'up' })
  status: Status;

  toResponseObject() {
    const { id, voteableId, voteableType, user } = this;
    let responseObject: Partial<VoteDTO> = {
      id,
      voteableId,
      voteableType,
    };
    if (user) {
      responseObject.user = user;
    }
    return responseObject;
  }
}
export interface IVoteable {
  votes: Promise<VoteEntity[]>;
  id: string;
}
