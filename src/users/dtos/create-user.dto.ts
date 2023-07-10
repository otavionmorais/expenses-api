import { IsString, MinLength } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from '../../app.constants';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;
}
