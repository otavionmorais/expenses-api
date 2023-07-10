import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListExpensesDTO {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  itemsPerPage?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0.01)
  @Type(() => Number)
  @ApiPropertyOptional()
  amount?: number;

  userId: string;
}
