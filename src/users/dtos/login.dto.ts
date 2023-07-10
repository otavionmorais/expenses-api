import { IsEmail, IsString, MinLength } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from '../../app.constants';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  @ApiProperty()
  password: string;
}
