import { Injectable } from '@nestjs/common';
import { SampleResponse } from './interface';

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
}
