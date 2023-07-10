import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { DATASOURCE_INJECTION_TOKEN } from '../app.constants';
import { CreateExpenseDTO } from './dtos/create-expense.dto';
import { userMock } from '../users/user.mocks';
import { expenseMock } from './expenses.mocks';
import { NotFoundException } from '@nestjs/common';

describe('ExpensesService', () => {
  let service: ExpensesService;
  const repository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: DATASOURCE_INJECTION_TOKEN,
          useValue: {
            getRepository: () => repository,
          },
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an expense', async () => {
    const expenseInfo = {
      amount: expenseMock.amount,
      description: expenseMock.description,
      date: expenseMock.date,
      userId: userMock.id,
    } as CreateExpenseDTO;

    jest.spyOn(repository, 'create').mockReturnValue(expenseMock);
    jest.spyOn(repository, 'save').mockResolvedValue(expenseMock);

    const result = await service.create(userMock, expenseInfo);

    expect(result).toBeDefined();
    expect(result.id).toEqual(expenseMock.id);
    expect(result.amount).toEqual(expenseMock.amount);
    expect(result.description).toEqual(expenseMock.description);
    expect(result.date).toEqual(expenseMock.date);
    expect(result.userId).toEqual(userMock.id);
  });

  it('should find all expenses', async () => {
    jest
      .spyOn(repository, 'findAndCount')
      .mockResolvedValue([[expenseMock], 1]);

    const result = await service.find({ userId: userMock.id });

    expect(result).toBeDefined();
    expect(result.page).toEqual(0);
    expect(result.totalItems).toEqual(1);
    expect(result.items[0]).toEqual(expenseMock);
  });

  it('should find an expense by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(expenseMock);

    const result = await service.findById(userMock.id, expenseMock.id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(expenseMock.id);
    expect(result.amount).toEqual(expenseMock.amount);
    expect(result.description).toEqual(expenseMock.description);
    expect(result.date).toEqual(expenseMock.date);
    expect(result.userId).toEqual(userMock.id);
  });

  it('should throw an error when expense is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findById(userMock.id, expenseMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete an expense', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(expenseMock);
    jest.spyOn(repository, 'delete').mockResolvedValue(null);

    await service.delete(userMock.id, expenseMock.id);

    expect(repository.delete).toHaveBeenCalled();
  });
});
