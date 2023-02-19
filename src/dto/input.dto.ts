import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsObject, IsOptional } from 'class-validator';
import { Types } from '../classes/types.enum';

class Data {
  @ApiProperty({
    description: 'start number of progression',
    example: 5,
  })
  @IsNumber()
  start: number;

  @ApiProperty({
    description: 'common ratio (step) of progression',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  common?: number;

  @ApiProperty({
    description: 'second number for fibonacci',
    example: 7,
  })
  @IsNumber()
  start2?: number;
}

export class InputDto {
  @ApiProperty({
    description: 'index (number) of number series numbers',
    example: 10,
  })
  @IsNumber()
  number: string;

  @ApiProperty({
    description: 'Progression key(number)',
    enum: [1, 2, 3, 4],
    example: 1,
  })
  @IsEnum(Types)
  type: number;

  @ApiProperty({
    description: 'data options',
    type: Data,
  })
  @IsObject()
  data: Data;
}
