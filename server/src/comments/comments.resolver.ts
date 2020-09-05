import {
  Resolver,
  Query,
  Mutation,
  Context,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentEntity } from './comments.entity';
import { UpdateCommentFormRequest } from './validation/updateCommentFormRequest';
import { AuthGuard } from '../shared/middleware/auth.guard';
import { VotesService } from '../votes/votes.service';
import { PostDTO } from '../posts/post.dto'
import { VoteDTO } from '../votes/vote.dto';
import { PostService } from '../posts/post.service'
import { CreateCommentFormRequest } from './validation/createCommentFormRequest';
@Resolver(() => CommentEntity)
export class CommentsResolver {
  constructor(
    private readonly commentService: CommentsService,
    private readonly voteService: VotesService,
    private readonly postService: PostService
  ) {}
  @UseGuards(new AuthGuard())
  @Mutation(() => CommentEntity, { name: 'createComment' })
  create(
    @Args('data') data: CreateCommentFormRequest,
    @Context('user') { id }: { id: string },
  ) {
    return this.commentService.create(data, id);
  }
  @UseGuards(new AuthGuard())
  @Mutation(() => CommentEntity, { name: 'updateComment' })
  update(@Args('data') data: UpdateCommentFormRequest, @Args('id') id: string) {
    return this.commentService.update(data, id);
  }
  @UseGuards(new AuthGuard())
  @Mutation(() => Boolean, { name: 'deleteComment' })
  delete(@Args('id') id: string) {
    return this.commentService.destroy(id);
  }
  @ResolveField(() => PostDTO) 
  post(@Parent() parent: CommentEntity): Promise<PostDTO> {
    console.log("here")
    return this.postService.show(parent.postId);
  }
  @ResolveField(() => [VoteDTO])
  votes(@Parent() parent: CommentEntity): Promise<VoteDTO[]> {
    return this.voteService.findVotesFor(parent.id, 'comment');
  }
}
