import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurdService } from './curd.service';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';

@Controller('curd')
export class CurdController {
  constructor(private readonly curdService: CurdService) {}

  @Post()
  create(@Body() createCurdDto: CreateCurdDto) {
    return this.curdService.create(createCurdDto);
  }

  @Get()
  findAll() {
    console.log(333);
    return this.curdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurdDto: UpdateCurdDto) {
    return this.curdService.update(+id, updateCurdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curdService.remove(+id);
  }
}
