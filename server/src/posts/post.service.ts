import { PostDTO } from './post.dto';

import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ObjectID, Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';

import { CreateFormRequest } from './validation/create.validation';
import { UpdateFormRequest } from './validation/update.validation';
import { PostEntity as Post } from './post.entity';
import { UserEntity as User } from '../users/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly posts: Repository<Post>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}
  async get() {
    return this.posts.find();
  }
  async show(id: string) {
    return this.posts.findOneOrFail(id);
  }
  delete(id: string): Promise<Boolean> {
    return this.posts
      .delete(id)
      .then(result => !!result.affected)
      .catch(err => {
        throw new HttpException(err.toString(), 400);
      });
  }
  async update({
    description,
    title,
    id,
  }: UpdateFormRequest): Promise<PostDTO> {
    const post = await this.posts.findOneOrFail(id);
    await this.posts.update(id, {
      title,
      description,
    });
    return post.toResponseObject() as PostDTO;
  }
  async findUserPosts(id: string) {
    let posts = await this.posts.find({
      userId: id,
    });
    return posts.map(post => post.toResponseObject()) as PostDTO[];
  }

  async create(
    { title, description }: CreateFormRequest,
    userId: string,
  ): Promise<PostDTO> {
    let post = await this.posts.create({
      title,
      description,
    });
    post.user = Promise.resolve(this.users.findOneOrFail(userId));
    post = await this.posts.save(post);
    return post.toResponseObject() as PostDTO;
  }
}
