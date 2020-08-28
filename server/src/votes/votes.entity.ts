import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from '../users/user.entity'
import { PostEntity } from '../posts/post.entity'
export enum Status {
  Up = 'up',
  Down = 'down',
}
@ObjectType('votes')
@Entity('votes')
export class VoteEntity extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(type => UserEntity, user => user.votes)
  @Field(() => UserEntity, { defaultValue: {} })
  user: Promise<UserEntity>;
  @ManyToOne(type => PostEntity, post => post.votes)
  @Field(() => PostEntity, { defaultValue: {} })
  post: Promise<PostEntity>;
  @Column("uuid")
  userId: string;
  @Column("uuid")
  postId: string;
  @Field()
  @Column("enum", { enum: Status, default: "up"})
  status: Status;
}
