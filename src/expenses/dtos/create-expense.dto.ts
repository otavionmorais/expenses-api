import {
  IsString,
  MaxLength,
  IsDateString,
  IsNumber,
  Validate,
  Min,
} from 'class-validator';
import { IsNotFutureDate } from '../../app.validators';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDTO {
  @IsString()
  @MaxLength(191)
  @ApiProperty()
  description: string;

  @IsDateString()
  @Validate(IsNotFutureDate)
  @ApiProperty()
  date: Date;

  @IsNumber()
  @Min(0.01)
  @ApiProperty()
  amount: number;

  userId: string;
}
