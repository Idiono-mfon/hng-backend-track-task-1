import { OperationType } from '../types';
export interface SampleResponse {
  slackUsername: string;
  backend: boolean;
  age: number;
  bio: string;
}

export interface ComputeArithmeticResponse {
  slackUsername: string;
  result: number;
  operation_type: OperationType;
}
