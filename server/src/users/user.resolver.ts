import { Query, Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/middleware/auth.guard';
import { LoginFormRequest } from './validation/login.validation';
import { RegisterFormRequest } from './validation/register.validation';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  users() {
    return this.userService.get();
  }

  @Mutation(() => UserDTO)
  async login(@Args('data') data: LoginFormRequest): Promise<UserDTO> {
    return this.userService.login(data);
  }
  @Mutation(() => UserDTO)
  register(@Args('data') data: RegisterFormRequest) {
    return this.userService.register(data);
  }

  @Query(() => UserDTO)
  @UseGuards(new AuthGuard())
  me(@Context('user') { id }) {
    return this.userService.me(id);
  }
}