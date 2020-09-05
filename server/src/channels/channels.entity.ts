import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
  PrimaryColumn,
  OneToMany
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../users/user.entity';
@Entity('channel_user')
@ObjectType()
export class ChannelUserEntity extends BaseEntity {
    @PrimaryColumn('uuid')

    channelId: string;
    @ManyToOne(() => UserEntity, user => user.channels, { primary: true})
    @Field(() => UserEntity)
    @JoinColumn({ name: 'userId'})
    user: Promise<UserEntity>;
    @ManyToOne(() => ChannelEntity, channel => channel.users, { primary: true})
    @JoinColumn({ name: 'channelId'})
    @Field(() => ChannelEntity)
    channel: Promise<ChannelEntity>;
    @PrimaryColumn('uuid')
    userId: string;
    @Column({ default: "member"})
    @Field()
    role: string;
}
@Entity('channels')
@ObjectType()
export class ChannelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID!)
  id: string;

  @Column()
  @Field()
  name: string;
  @Column()
  @Field()
  description: string;
  @Column()
  @Field()
  rules: string;
  @OneToMany(() => ChannelUserEntity, channel => channel.user)
  users: Promise<ChannelUserEntity[]>;
  @ManyToOne(
    () => UserEntity,
    user => user.channels,
  )
  @Field(() => UserEntity!)
  user: Promise<UserEntity>;
  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
