import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  @ApiPropertyOptional()
  password?: string;
}
