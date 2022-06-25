import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';
import { UserInterface } from './dto/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: UserInterface) {
    const userInfo = new User();
    userInfo.firstName = user.firstName;
    userInfo.lastName = user.lastName;
    userInfo.isActive = user.isActive;
    userInfo.age = user.age;
    userInfo.save();
    return {
      msg: 'success',
    };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
