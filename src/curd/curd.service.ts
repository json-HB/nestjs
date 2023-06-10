import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';
import { Curd, Question, Category, User } from './entities/curd.entity';
import { Profile } from './entities/other.entity';

@Injectable()
export class CurdService {
  constructor(
    @InjectRepository(Curd)
    private curdRespository: Repository<Curd>,
    @InjectRepository(Question)
    private questionRespository: Repository<Question>,
    @InjectRepository(Category)
    private categoryRespository: Repository<Category>,
    @InjectRepository(User)
    private userRespository: Repository<User>,
    @InjectRepository(Profile)
    private profileRespository: Repository<Profile>,
  ) {}

  async create(createCurdDto: CreateCurdDto) {
    const curd = new Curd();
    curd.description = createCurdDto.description;
    curd.name = createCurdDto.name;
    curd.filename = createCurdDto.filename;
    curd.views = createCurdDto.views;
    curd.isPublished = createCurdDto.isPublished;
    await this.curdRespository.save(curd);
    return {
      msg: 'success',
    };
  }

  async findAll() {
    return await this.curdRespository.find();
  }

  async findOne(id: number) {
    return await this.curdRespository.findOneBy({
      id,
    });
  }

  update(id: number, updateCurdDto: UpdateCurdDto) {
    return `This action updates a #${id} curd`;
  }

  remove(id: number) {
    return `This action removes a #${id} curd`;
  }

  async m2m(res) {
    const c1 = new Category();
    c1.name = 'react';
    const c2 = new Category();
    c2.name = 'vue';

    const question = new Question();
    question.title = 'How to ask questions?';
    question.text = 'Where can I ask TypeORM-related questions?';

    question.categories = [c1, c2];

    return this.questionRespository.save(question);
  }

  async o2o(res) {
    const profile = new Profile();
    profile.gender = 'male';
    profile.photo = 'me.jpg';
    await this.profileRespository.save(profile);

    const user = new User();
    user.name = 'Joe Smith';
    user.profile = profile;

    return this.userRespository.save(user);
  }

  async findUser(id: string) {
    // return this.userRespository.findOne({
    //   where: {
    //     id: +id,
    //   },
    // });
    return this.userRespository
      .createQueryBuilder('man')
      .leftJoinAndSelect('man.profile', 'profile')
      .getMany();
  }
}
