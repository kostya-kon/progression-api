import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { InputDto } from './dto/input.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('output')
  getOutput(@Query('tiket') tiket: string) {
    return this.appService.getOutput(tiket);
  }

  @Get('inprogress')
  getInProgress() {
    return this.appService.getInProgress();
  }

  @Post('input')
  createProgression(@Body() inputDto: InputDto) {
    return this.appService.createProgression(inputDto);
  }
}
