import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {
  DATASOURCE_INJECTION_TOKEN,
  JWT_EXPIRATION_IN_SECONDS,
  TESTING_JWT_SECRET,
  TESTING_USER_HASHED_PASSWORD,
  TESTING_USER_PASSWORD,
} from '../app.constants';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserDTO } from './dtos/create-user.dto';
import { userMock } from './user.mocks';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  const repository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DATASOURCE_INJECTION_TOKEN,
          useValue: {
            getRepository: () => repository,
          },
        },
      ],
      imports: [
        JwtModule.register({
          secret: TESTING_JWT_SECRET,
          signOptions: { expiresIn: JWT_EXPIRATION_IN_SECONDS },
        }),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const userInfo = {
      email: userMock.email,
      name: userMock.name,
      password: TESTING_USER_PASSWORD,
    } as CreateUserDTO;

    jest.spyOn(repository, 'create').mockReturnValue(userMock);
    jest.spyOn(repository, 'save').mockResolvedValue(userMock);

    const result = await service.create(userInfo);

    expect(repository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.id).toBe(userMock.id);
    expect(result.name).toBe(userMock.name);
    expect(result.email).toBe(userMock.email);
    expect(result).not.toHaveProperty('password');
  });

  it('should find an user by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(userMock);

    const result = await service.findById(userMock.id);

    expect(repository.findOne).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.id).toBe(userMock.id);
    expect(result.name).toBe(userMock.name);
    expect(result.email).toBe(userMock.email);
    expect(result).not.toHaveProperty('password');
  });

  it('should throw an error when user is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findById(userMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update an user', async () => {
    const newMail = 'newmail@test.com';

    const userInfo = {
      email: newMail,
    } as UpdateUserDTO;

    jest.spyOn(repository, 'findOne').mockResolvedValue(userMock);
    jest.spyOn(repository, 'save').mockResolvedValue({
      ...userMock,
      email: newMail,
    });

    const result = await service.update(userMock, userInfo);

    expect(repository.findOne).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.id).toBe(userMock.id);
    expect(result.name).toBe(userMock.name);
    expect(result.email).toBe(newMail);
    expect(result.password).toBe(undefined);
  });

  it('should delete an user', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(userMock);
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    await service.delete(userMock.id);

    expect(repository.findOne).toHaveBeenCalled();
    expect(repository.delete).toHaveBeenCalled();
  });

  it('should login an user', async () => {
    const userInfo = {
      email: userMock.email,
      password: TESTING_USER_PASSWORD,
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue({
      ...userMock,
      password: TESTING_USER_HASHED_PASSWORD,
    });

    const result = await service.login(userInfo);

    expect(repository.findOne).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('expires_in');
  });

  it('should throw an error when user already exists', async () => {
    const userInfo = {
      email: userMock.email,
      name: userMock.name,
      password: TESTING_USER_PASSWORD,
    } as CreateUserDTO;

    jest.spyOn(repository, 'findOne').mockResolvedValue(userMock);

    await expect(service.create(userInfo)).rejects.toThrow(ConflictException);
  });
});
