import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import { CommentEntity } from '../comments/comments.entity'
import { PostEntity as Post} from '../posts/post.entity'
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserDTO } from './user.dto';
import { config } from '../shared/config';
import { VoteEntity } from '../votes/votes.entity'
@Entity('users')
@ObjectType()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column('text')
  @Field()
  name: string;
  @Column('text', { unique: true })
  @Field()
  email: string;
  @Column('text')
  password: string;
  @OneToMany(type => Post, post => post.user)
  @Field(() => [Post], { defaultValue: [] })
  posts: Promise<Post[]>;
  @OneToMany(type => CommentEntity, comment => comment.user)
  @Field(() => [CommentEntity], { defaultValue: [] })
  comments: Promise<CommentEntity[]>;
  @OneToMany(type => VoteEntity, vote => vote.user)
  @Field(() => [VoteEntity], { defaultValue: [] })
  votes: Promise<VoteEntity[]>;

  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }
  private get token() {
    const { id, name } = this;
    return sign({ id, name }, config.JWT_TOKEN, {
      expiresIn: config.JWT_TOKEN_EXPIRATION,
    });
  }
  toResponseObject(showToken: boolean = true): Partial<UserDTO> {
    const { id, created_at, name, email, token, updated_at, posts } = this;
    let responseObject: Partial<UserDTO> = {
      id,
      name,
      email,
      created_at,
      updated_at,
    };
    if(posts) {
      responseObject.posts = posts;

    }
    if (showToken) {
      responseObject.auth_token = token;
    }
    return responseObject;
  }
}
