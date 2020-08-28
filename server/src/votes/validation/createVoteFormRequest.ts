import { IsNotEmpty, IsEnum } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql'
import {Status }  from '../votes.entity'
@InputType()
export class CreateVoteFormRequest {

  @IsNotEmpty()
  @Field()
  postId: string;

  @IsNotEmpty()
  @IsEnum(Status)
  @Field()
  status: Status;
}