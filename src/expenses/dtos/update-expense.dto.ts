import {
  IsString,
  MaxLength,
  IsDateString,
  IsNumber,
  Validate,
  Min,
  IsOptional,
} from 'class-validator';
import { IsNotFutureDate } from '../../app.validators';

export class UpdateExpenseDTO {
  @IsString()
  @MaxLength(191)
  @IsOptional()
  description?: string;

  @IsDateString()
  @Validate(IsNotFutureDate)
  @IsOptional()
  date?: Date;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  amount?: number;

  userId: string;
}
