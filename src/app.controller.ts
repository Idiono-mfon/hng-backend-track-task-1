import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SampleResponse } from './interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): SampleResponse {
    return this.appService.getHello();
  }
}
