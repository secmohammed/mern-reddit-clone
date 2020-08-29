import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator'
@InputType()
export class UpdateCommentFormRequest {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    @Field()
    body: string;
}