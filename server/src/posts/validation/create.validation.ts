import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql'
@InputType()
export class CreateFormRequest {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Field()
  title: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Field()
  description: string;
}