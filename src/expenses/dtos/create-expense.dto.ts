import {
  IsString,
  MaxLength,
  IsDateString,
  IsNumber,
  Validate,
  Min,
} from 'class-validator';
import { IsNotFutureDate } from '../../app.validators';

export class CreateExpenseDTO {
  @IsString()
  @MaxLength(191)
  description: string;

  @IsDateString()
  @Validate(IsNotFutureDate)
  date: Date;

  @IsNumber()
  @Min(0.01)
  amount: number;

  userId: string;
}
