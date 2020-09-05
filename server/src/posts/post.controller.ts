import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('users')
export class UsersController {
      constructor(
    private readonly postService: PostService,
  ) {}

  @Get()
  findAll() {
    return this.postService.get();
  }
}