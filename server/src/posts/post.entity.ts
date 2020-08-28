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
  OneToMany
} from 'typeorm';
import { PostDTO } from './post.dto';
import { config } from '../shared/config';
import { UserEntity } from '../users/user.entity'
import { VoteEntity } from '../votes/votes.entity'
@Entity('posts')
@ObjectType()
export class PostEntity extends BaseEntity {
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
  @OneToMany(type => VoteEntity, vote => vote.post)
  @Field(() => [VoteEntity], { defaultValue: []})
  votes: Promise<VoteEntity[]>;
  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
  @BeforeInsert()
  toResponseObject(): Partial<PostDTO> {
    const { id, created_at, title, description, updated_at, user, votes } = this;
    let responseObject: Partial<PostDTO> = {
      id,
      title,
      description,
      created_at,
      updated_at,
    };
    if(votes) {
      responseObject.votes = votes;
    }
    if (user) {
      responseObject.user = user;
    }
    return responseObject;
  }
}
