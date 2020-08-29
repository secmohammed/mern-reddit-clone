import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity as Post } from '../posts/post.entity';
import { UserEntity as User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { VoteDTO } from './vote.dto';
import { Status, VoteEntity as Vote } from './votes.entity';
@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Post)
    private readonly posts: Repository<Post>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectRepository(Vote)
    private readonly votes: Repository<Vote>,
  ) {}

  async create(
    { status, voteableId, voteableType }: { status: Status; voteableId: string, voteableType },
    userId: string,
  ): Promise<VoteDTO> {
    let vote = await this.votes.create({
      status,
      userId,
      voteableId,
      voteableType
    });
    await this.votes.save(vote);
    return vote;
  }
  async destroy(id: string): Promise<Boolean> {
    return this.votes
      .delete(id)
      .then(result => !!result.affected)
      .catch(err => {
        throw new HttpException(err, 401);
      });
  }
  async findVotesFor(id: string, type: string) {
      return this.votes.find({
          voteableId: id,
          voteableType: type
      })
  }
  async show(id: string): Promise<VoteDTO> {
    return this.votes.findOneOrFail(id);
  }
  async update(status: Status, voteId: string): Promise<VoteDTO> {
    const vote = this.votes.findOneOrFail(voteId);
    await this.votes.update(voteId, { status });
    return vote;
  }
}
