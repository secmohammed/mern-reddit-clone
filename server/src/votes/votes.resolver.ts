import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { VotesService } from './votes.service';
import { AuthGuard } from '../shared/middleware/auth.guard';
import { VoteDTO } from './vote.dto';
import { UserDTO } from '../users/user.dto';
import { PostDTO } from '../posts/post.dto';
import { PostService } from '../posts/post.service';
import { UserService } from '../users/user.service';
import { VoteEntity } from './votes.entity'
import { CreateVoteFormRequest } from './validation/createVoteFormRequest';
import { Status } from './votes.entity';
@Resolver(() => VoteEntity)
export class VotesResolver {
  constructor(
    private readonly voteService: VotesService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Query(() => VoteDTO, { name: 'showVote' })
  show(@Args('id') id: string) {
    return this.voteService.show(id);
  }
  @UseGuards(new AuthGuard())
  @Mutation(() => VoteDTO, { name: 'createVote' })
  create(
    @Args('data') data: CreateVoteFormRequest,
    @Context('user') { id }: { id: string },
  ) {
    return this.voteService.create(data, id);
  }
  @UseGuards(new AuthGuard())
  @Mutation(() => VoteDTO, { name: 'updateVote' })
  update(@Args('status') status: Status, @Args('voteId') voteId: string) {
    return this.voteService.update(status, voteId);
  }
  @UseGuards(new AuthGuard())
  @Mutation(() => Boolean, { name: 'deleteVote' })
  destroy(@Args('id') id: string) {
    return this.voteService.destroy(id);
  }
  @ResolveField(() => PostDTO)
  post(@Parent() parent: VoteDTO) {
    return this.postService.show(parent.postId);
  }
  @ResolveField(() => UserDTO)
  user(@Parent() parent: VoteDTO) {
    return this.userService.findById(parent.userId);
  }
}