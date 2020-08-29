import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { PostDTO } from './post.dto';
import { config } from '../shared/config';
import { UserEntity } from '../users/user.entity'
import { VoteEntity, IVoteable } from '../votes/votes.entity'
import { CommentEntity } from '../comments/comments.entity'
@Entity('posts')
@ObjectType()
export class PostEntity extends BaseEntity implements IVoteable {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column('text')
  @Field()
  description: string;
  @Column('text', { unique: true })
  @Field()
  title: string;
  @Column("uuid")
  userId: string;
  @ManyToOne(type => UserEntity, user => user.posts)
  @Field(() => UserEntity, { defaultValue: {} })
  user: Promise<UserEntity>;
  @OneToMany(() => VoteEntity, vote => vote.voteableId)
  @JoinColumn( { name: "voteableId"})
  @Field(() => [VoteEntity!], { defaultValue: []})
  votes: Promise<VoteEntity[]>;
  @OneToMany(type => CommentEntity, comment => comment.post)
  @Field(() => [CommentEntity], { defaultValue: []})
  comments: Promise<CommentEntity[]>;
  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
  @BeforeInsert()
  toResponseObject(): Partial<PostDTO> {
    const { id, created_at, title, description, updated_at, user, votes, comments } = this;
    let responseObject: Partial<PostDTO> = {
      id,
      title,
      description,
      created_at,
      updated_at,
      
    };
    if(comments) {
      responseObject.comments = comments;
    }
    if(votes) {
      responseObject.votes = votes;
    }
    if (user) {
      responseObject.user = user;
    }
    return responseObject;
  }
}
