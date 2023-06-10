import { Module } from '@nestjs/common';
import { CurdService } from './curd.service';
import { CurdController } from './curd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Curd,
  Question,
  Category,
  Article,
  User,
} from './entities/curd.entity';
import { Profile } from './entities/other.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Article,
      Curd,
      Question,
      Category,
      User,
      Profile,
    ]),
  ],
  controllers: [CurdController],
  providers: [CurdService],
})
export class CurdModule {}
