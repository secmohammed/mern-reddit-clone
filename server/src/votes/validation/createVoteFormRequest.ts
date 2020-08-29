import { IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql'
import {Status }  from '../votes.entity'
@InputType()
export class CreateVoteFormRequest {

  @IsNotEmpty()
  @Field()
  @IsUUID()
  voteableId: string;
  @Field()
  @IsNotEmpty()
  voteableType: string;
  @IsNotEmpty()
  @IsEnum(Status)
  @Field()
  status: Status;
}