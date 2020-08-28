import { IsNotEmpty, MinLength, MaxLength, IsBoolean } from 'class-validator';
import { CreateFormRequest } from './create.validation';
import { Field, InputType } from '@nestjs/graphql'
@InputType()
export class UpdateFormRequest extends CreateFormRequest {
  @IsNotEmpty()
  @Field()
  id: string;
}
