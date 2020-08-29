import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../users/user.entity'
@Entity("comments")
@ObjectType()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID!)
  id: string;
  @Column()
  @Field()
  body: string;
  @Column("uuid")
  postId: string;
  @Column("uuid")
  userId: string;
  @ManyToOne(
    () => PostEntity,
    post => post.comments,
  )
  @Field(() => PostEntity)
  post: Promise<PostEntity>;
  @ManyToOne(
    () => UserEntity,
    user => user.comments,
  )
  @Field(() => UserEntity)
  user: Promise<UserEntity>;
  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
