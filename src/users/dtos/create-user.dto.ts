import { IsString, MinLength } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from '../../app.constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  @ApiProperty()
  password: string;
}
