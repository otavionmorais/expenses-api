import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { User } from './users.entity';
import { ErrorCode } from '../app.errors';
import { Inject } from '@nestjs/common';
import {
  DATASOURCE_INJECTION_TOKEN,
  JWT_EXPIRATION_IN_SECONDS,
  PASSWORD_ROUNDS,
} from '../app.constants';
import { DataSource } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { compare, hash } from 'bcrypt';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { IAuthenticationResponse } from './user.structures';
import { LoginDTO } from './dtos/login.dto';
import { instanceToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  private repository;

  constructor(
    @Inject(DATASOURCE_INJECTION_TOKEN)
    private expensesDataSource: DataSource,
    private jwtService: JwtService,
  ) {
    this.repository = this.expensesDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.', ErrorCode.USER_NOT_FOUND);
    }

    return instanceToInstance(user);
  }

  async create(data: CreateUserDTO): Promise<User> {
    const { password, email, ...rest } = data;

    const userExists = await this.repository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException(
        'User already exists.',
        ErrorCode.USER_ALREADY_EXISTS,
      );
    }

    const passwordHash = await hash(password, PASSWORD_ROUNDS);

    const user = this.repository.create({
      ...rest,
      email,
      password: passwordHash,
    });

    return instanceToInstance(this.repository.save(user));
  }

  async update(user: User, dataToUpdate: UpdateUserDTO): Promise<User> {
    if (dataToUpdate.password) {
      dataToUpdate.password = await hash(
        dataToUpdate.password,
        PASSWORD_ROUNDS,
      );
    }

    await this.repository.update(
      {
        id: user.id,
      },
      dataToUpdate,
    );

    dataToUpdate.password = undefined;

    return instanceToInstance({
      ...user,
      ...dataToUpdate,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      id,
    });
  }

  async login(loginData: LoginDTO): Promise<IAuthenticationResponse> {
    const { email, password } = loginData;

    const user = await this.repository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException(
        'Invalid credentials.',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException(
        'Invalid credentials.',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    return {
      access_token: await this.jwtService.signAsync({ sub: user.id }),
      expires_in: JWT_EXPIRATION_IN_SECONDS,
    };
  }
}
