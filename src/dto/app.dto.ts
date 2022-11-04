import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

import { OperationType } from '../types';

export class ComputeArithmeticDto {
  @IsNotEmpty()
  operation_type: OperationType;

  @IsOptional()
  @IsNumber()
  x: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  y: number;
}
