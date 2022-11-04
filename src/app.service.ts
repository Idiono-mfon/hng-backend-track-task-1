import { Injectable, Post } from '@nestjs/common';
import { SampleResponse, ComputeArithmeticResponse } from './interface';
import { ComputeArithmeticDto } from './dto/app.dto';
import { Operation } from './enums';

@Injectable()
export class AppService {
  getHello(): SampleResponse {
    return {
      slackUsername: 'idionomfonetim',
      backend: true,
      age: 26,
      bio: 'A curious engineer fascinated about technology, and majoring mostly on backend engineering',
    };
  }

  computeOperation(dto: ComputeArithmeticDto): ComputeArithmeticResponse {
    let result: number;

    const response = {
      slackUsername: 'idionomfonetim',
      operation_type: dto.operation_type,
    };
    switch (dto.operation_type) {
      case Operation.addition:
        result = dto.x + dto.y;
        return { ...response, result };

      case Operation.subtraction:
        result = dto.x - dto.y;
        return { ...response, result };

      case Operation.multiplication:
        result = dto.x * dto.y;
        return { ...response, result };

      default:
        // Add ometing here
        break;
    }
  }
}
