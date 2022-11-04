import { Operation } from '../enums';
export type OperationType =
  | Operation.addition
  | Operation.subtraction
  | Operation.multiplication
  | string;
