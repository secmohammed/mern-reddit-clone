import {
  Query,
  Resolver,
  Context,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/middleware/auth.guard';
import { CreateFormRequest } from './validation/create.validation';
import { UpdateFormRequest } from './validation/update.validation';
import { PostDTO } from './post.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { UserService } from '../users/user.service';
import { VoteDTO } from '../votes/vote.dto'
@Resolver(() => PostEntity)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [PostEntity])
  posts() {
    return this.postService.get();
  }
  @Query(() => PostEntity)
  post(@Args('id') id: string) {
    return this.postService.show(id);
  }
  @Mutation(() => PostDTO, { name: 'createPost' })
  @UseGuards(new AuthGuard)
  async create(
    @Args('data') data: CreateFormRequest,
    @Context('user') { id },
  ): Promise<PostDTO> {
    return this.postService.create({ ...data }, id);
  }
  @UseGuards(new AuthGuard)
  @Mutation(() => PostDTO, { name: 'updatePost' })
  update(@Args('data') data: UpdateFormRequest) {
    return this.postService.update(data);
  }
  @UseGuards(new AuthGuard)
  @Mutation(() => Boolean, { name: 'destroyPost'})
  destroy(@Args('id') id: string) {
    return this.postService.delete(id)
  }
  @ResolveField(() => [VoteDTO])
  votes(@Parent() parent: PostEntity): Promise<VoteDTO[]> {
    return  parent.votes.then((votes) => votes)
  }
  @ResolveField()
  user(@Parent() post: PostEntity) {
    return this.userService.findById(post.userId);
  }
}
