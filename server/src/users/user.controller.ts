import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('api/users')
export class UserController {
  constructor(private readonly users: UserService) {}
  @Get()
  index() {
    return this.users.get();
  }
}