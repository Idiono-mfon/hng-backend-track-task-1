import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SampleResponse, ComputeArithmeticResponse } from './interface';
import { ComputeArithmeticDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): SampleResponse {
    return this.appService.getHello();
  }

  @Post()
  computeArithmetic(
    @Body() dto: ComputeArithmeticDto,
  ): ComputeArithmeticResponse {
    return this.appService.computeOperation(dto);
  }
}
