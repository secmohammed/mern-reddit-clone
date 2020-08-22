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
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserDTO } from './user.dto';
import { config } from '../shared/config';
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
  // @OneToMany(type => Channel, channel => channel.owner)
  // @Field(() => [Channel], { defaultValue: [] })
  // channels: Channel[];

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
    const { id, created_at, name, email, token, updated_at } = this;
    let responseObject: Partial<UserDTO> = {
      id,
      name,
      email,
      created_at,
      updated_at,
    };
    if (showToken) {
      responseObject.auth_token = token;
    }
    return responseObject;
  }
}
