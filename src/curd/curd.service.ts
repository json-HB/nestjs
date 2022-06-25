import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';
import { Curd } from './entities/curd.entity';

@Injectable()
export class CurdService {
  constructor(
    @InjectRepository(Curd)
    private curdRespository: Repository<Curd>,
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
}
