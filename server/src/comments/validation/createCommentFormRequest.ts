import { InputType, Field } from '@nestjs/graphql'

import { IsNotEmpty, MinLength, MaxLength, IsUUID } from 'class-validator'
@InputType()
export class CreateCommentFormRequest {
    @IsNotEmpty()
    @Field()
    @MinLength(3)
    @MaxLength(255)
    body: string;
    @IsNotEmpty()
    @Field()
    @IsUUID()
    postId: string;
}