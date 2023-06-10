import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { CurdService } from './curd.service';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';

@Controller('curd')
export class CurdController {
  constructor(private readonly curdService: CurdService) {}

  @Get('user')
  findUser(@Query('id') id: string) {
    return this.curdService.findUser(id);
  }

  @Post()
  create(@Body() body) {
    console.log(body);
    return this.curdService.create(body);
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

  @Post('m2m')
  manyToMany(@Body() body) {
    return this.curdService.m2m(body);
  }

  @Post('o2o')
  oneToOne(@Body() body) {
    return this.curdService.o2o(body);
  }
}
