import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { InputData } from './classes/input-data.class';
import { InputDto } from './dto/input.dto';
@ApiTags('Core API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Get result of job' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Number,
    isArray: true,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Id not was not found or not processed',
  })
  @HttpCode(HttpStatus.OK)
  @Get('output')
  getOutput(@Query('tiket') tiket: string) {
    return this.appService.getOutput(tiket);
  }

  @ApiOperation({ summary: 'Get all in progress job' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Number,
    isArray: true,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Get('inprogress')
  getInProgress() {
    return this.appService.getInProgress();
  }

  @ApiOperation({ summary: 'Create progression' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: InputData,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Post('input')
  createProgression(@Body() inputDto: InputDto) {
    return this.appService.createProgression(inputDto);
  }
}
