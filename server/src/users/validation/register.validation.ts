import { IsNotEmpty, MinLength, MaxLength, IsBoolean } from 'class-validator';
import { LoginFormRequest } from './login.validation';
import { Field, InputType } from '@nestjs/graphql'
@InputType()
export class RegisterFormRequest extends LoginFormRequest {
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Field()
  name: string;

  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Field()
  password_confirmation: string;
}
