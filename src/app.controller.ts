import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  HttpStatus,
} from '@nestjs/common';
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

  @HttpCode(HttpStatus.OK)
  @Post()
  async computeArithmetic(
    @Body() dto: ComputeArithmeticDto,
  ): Promise<ComputeArithmeticResponse> {
    return await this.appService.computeOperation(dto);
  }
}
