import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql'
@InputType()
export class LoginFormRequest {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Field()
  password: string;
}