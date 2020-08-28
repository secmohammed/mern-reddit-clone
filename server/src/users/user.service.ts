import { UserDTO } from './user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ObjectID, Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';

import { LoginFormRequest } from './validation/login.validation';
import { RegisterFormRequest } from './validation/register.validation';
import { UserEntity as User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}
  async get() {
    return this.users.find();
  }
  async login({ email, password }: LoginFormRequest): Promise<UserDTO> {
    const user = await this.users.findOneOrFail({
      where: { email },
    });
    if (!compareSync(password, user.password)) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    return user.toResponseObject() as UserDTO;
  }
  async register({
    password,
    password_confirmation,
    email,
    name,
  }: RegisterFormRequest): Promise<UserDTO> {
    if (password != password_confirmation) {
      throw new NotFoundException(
        'Password and password_confirmation should match',
      );
    }

    const count = await this.users.count({
      where: {
        email,
      },
    });
    if (count) {
      throw new NotFoundException('email exists, please pick up another one.');
    }
    let user = await this.users.create({
      name,
      email,
      password,
    });
    user = await this.users.save(user);
    return user.toResponseObject() as UserDTO;
  }
  async findById(id: string): Promise<UserDTO> {
    const user = await this.users.findOneOrFail(id);
    return user.toResponseObject(false) as UserDTO;
  }
  async me({ id }: any): Promise<UserDTO> {
    const user = await this.users.findOneOrFail(id, {});
    return user.toResponseObject(false) as UserDTO;
  }
}
