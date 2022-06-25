import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsNumberString,
  IsNumber,
  isString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UserInterface {
  firstName: string;
  lastName: string;
  isActive: boolean;
  age: number;
}

export class Valid {
  @IsEmail()
  emial: string;

  @IsNotEmpty()
  @Length(3, 10)
  password: string;

  @IsNumberString()
  age: number;
}

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export class ArrayItem extends FindOneParams {
  @IsNotEmpty()
  name: string;
}
