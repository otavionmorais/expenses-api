import { User } from './users.entity';

export interface IAuthenticationResponse {
  access_token: string;
  expires_in: number;
}

export interface IRequestUser {
  user: User;
}
