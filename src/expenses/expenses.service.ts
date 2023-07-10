import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDTO } from './dtos/create-expense.dto';
import { DataSource, ILike } from 'typeorm';
import {
  DATASOURCE_INJECTION_TOKEN,
  EXPENSE_CREATION_SENDER_EMAIL,
} from '../app.constants';
import { Expense } from './expenses.entity';
import { ListExpensesDTO } from './dtos/list-expenses.dto';
import { IPaginatedList } from '../app.structures';
import { ErrorCode } from '../app.errors';
import { UpdateExpenseDTO } from './dtos/update-expense.dto';
import { AWSProvider } from '../providers/aws.provider';
import { User } from '../users/users.entity';

@Injectable()
export class ExpensesService {
  private repository;

  constructor(
    @Inject(DATASOURCE_INJECTION_TOKEN)
    private expensesDataSource: DataSource,
  ) {
    this.repository = this.expensesDataSource.getRepository(Expense);
  }

  async find({
    userId,
    description,
    amount,
    itemsPerPage = 20,
    page = 0,
  }: ListExpensesDTO): Promise<IPaginatedList<Expense>> {
    const where = {
      userId,
      amount,
      ...(description && {
        description: ILike(`%${description}%`),
      }),
    };

    const [expenses, totalItems] = await this.repository.findAndCount({
      where,
      order: {
        createdAt: 'DESC',
      },
      take: itemsPerPage,
      skip: itemsPerPage * page,
    });

    return {
      page,
      totalItems,
      itemsPerPage,
      items: expenses,
    };
  }

  async findById(userId: string, expenseId: string): Promise<Expense> {
    const expense = await this.repository.findOne({
      where: {
        id: expenseId,
        userId,
      },
    });

    if (!expense) {
      throw new NotFoundException(
        'Expense not found.',
        ErrorCode.EXPENSE_NOT_FOUND,
      );
    }

    return expense;
  }

  async create(user: User, data: CreateExpenseDTO) {
    const expenseEntity = this.repository.create(data);
    const result = await this.repository.save(expenseEntity);

    const formattedAmount = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(data.amount);

    if (process.env.NODE_ENV !== 'test') {
      AWSProvider.sendMail({
        sender: EXPENSE_CREATION_SENDER_EMAIL,
        to: [user.email],
        subject: 'Nova despesa cadastrada',
        body: `A despesa ${data.description} no valor de ${formattedAmount} foi cadastrada com sucesso.`,
      });
    }

    return result;
  }

  async update(
    expenseId: string,
    dataToUpdate: UpdateExpenseDTO,
  ): Promise<Expense> {
    const expense = await this.findById(dataToUpdate.userId, expenseId);

    return this.repository.save({
      ...expense,
      ...dataToUpdate,
    });
  }

  async delete(userId: string, expenseId: string): Promise<void> {
    await this.findById(userId, expenseId);
    await this.repository.delete({ id: expenseId });
  }
}
