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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateExpenseDTO {
  @IsString()
  @MaxLength(191)
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsDateString()
  @Validate(IsNotFutureDate)
  @IsOptional()
  @ApiPropertyOptional()
  date?: Date;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  @ApiPropertyOptional()
  amount?: number;

  userId: string;
}
