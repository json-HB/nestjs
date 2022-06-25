import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(res) {
    const user = new User();

    const password = md5(res.password);
    const hasUser = await this.userRepository.findOneBy({
      username: res.username,
    });

    if (hasUser) {
      return {
        msg: 'name repeat',
      };
    }

    user.password = password;
    user.username = res.username;
    return this.userRepository.save(user);
  }

  async findOne(username) {
    return this.userRepository.findOneBy({ username });
  }
}
