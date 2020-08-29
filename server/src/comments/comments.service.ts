import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comments.entity';
import { CreateCommentFormRequest } from './validation/createCommentFormRequest';
import { UpdateCommentFormRequest } from './validation/updateCommentFormRequest';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly comments: Repository<CommentEntity>,
  ) {}
  async create(
    data: CreateCommentFormRequest,
    userId: string,
  ): Promise<CommentEntity> {
    const comment = await this.comments.create({
      ...data,
      userId,
    });
    await this.comments.save(comment);
    return comment;
  }
  async update(
    { body }: UpdateCommentFormRequest,
    commentId: string,
  ): Promise<CommentEntity> {
    const comment = await this.comments.findOneOrFail(commentId);
    comment.body = body;
    await this.comments.save(comment);
    return comment;
  }
  showCommentsForPost(postId: string): Promise<CommentEntity[]> {
    return this.comments.find({
      postId,
    });
  }
  async destroy(commentId: string): Promise<Boolean> {
    return this.comments.delete(commentId).then(result => !!result.affected);
  }
}
