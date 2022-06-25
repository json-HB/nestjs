import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { Category } from './cate.entity';
import { Post } from './post.entity';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
