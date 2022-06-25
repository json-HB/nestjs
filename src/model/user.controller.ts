import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from './dto/user';
import { Valid, FindOneParams, ArrayItem } from './dto/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('ids')
  getIds(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: string[],
  ) {
    return ids;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() data: UserInterface) {
    return this.userService.create(data);
  }

  @Post('valid')
  @UsePipes(new ValidationPipe({ transform: true }))
  validTest(@Body() data: Valid) {
    console.log(data);
    return data;
  }

  @Post('arr')
  @Header('arrHead', 'caosini')
  receiveArr(
    @Body(new ParseArrayPipe({ items: ArrayItem }))
    data: ArrayItem[],
  ) {
    return data;
  }
}
