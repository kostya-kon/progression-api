import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class InputData {
  @ApiProperty({
    description: 'ticket number',
    example: 111,
  })
  @IsNumber()
  tiket: number;
}
