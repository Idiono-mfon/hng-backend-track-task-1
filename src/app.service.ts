import { Injectable, Post, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { SampleResponse, ComputeArithmeticResponse } from './interface';
import { ComputeArithmeticDto } from './dto/app.dto';
import { Operation } from './enums';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}
  getHello(): SampleResponse {
    return {
      slackUsername: 'idionomfonetim',
      backend: true,
      age: 26,
      bio: 'A curious engineer fascinated about technology, and majoring mostly on backend engineering',
    };
  }

  async computeOperation(
    dto: ComputeArithmeticDto,
  ): Promise<ComputeArithmeticResponse> {
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
        const aiResponse = await this.getOpenAIRes(dto.operation_type);

        result = this.formatAIResponse(aiResponse);

        return { ...response, result };
    }
  }

  async getOpenAIRes(prompt: string) {
    try {
      const configuration = new Configuration({
        apiKey: this.config.get('OPENAI_API_KEY'),
      });
      const openai = new OpenAIApi(configuration);

      console.log(this.config.get('OPENAI_API_KEY'));

      const response = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
      });

      return response.data.choices[0].text;
    } catch (error) {
      throw new InternalServerErrorException(error.messages);
    }
  }

  formatAIResponse(str: string) {
    const keyword1 = 'answer is';
    const keyword2 = '=';

    let index = str.search(keyword1);

    if (index !== -1) {
      return this.parser(str, index + keyword1.length);
    }

    index = str.search(keyword2);

    if (index !== -1) {
      return this.parser(str, index + keyword2.length);
    }

    return 0;
  }

  parser(str: string, index: number): number {
    const sliceRes = str.slice(index);
    const numRes = Number(sliceRes);

    return numRes || 0;
  }
}
