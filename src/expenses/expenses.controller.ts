import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expenses.entity';
import { CreateExpenseDTO } from './dtos/create-expense.dto';
import { UsersGuard } from '../users/users.guard';
import { IRequestUser } from '../users/user.structures';
import { IPaginatedList } from '../app.structures';
import { ListExpensesDTO } from './dtos/list-expenses.dto';
import { UuidParamDTO } from '../app.validators';

@Controller('expenses')
@UseGuards(UsersGuard)
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  find(
    @Req() { user }: IRequestUser,
    @Query() filters: ListExpensesDTO,
  ): Promise<IPaginatedList<Expense>> {
    return this.expensesService.find({
      ...filters,
      userId: user.id,
    });
  }

  @Get('/:id')
  findById(
    @Req() { user }: IRequestUser,
    @Param() { id: expenseId }: UuidParamDTO,
  ): Promise<Expense> {
    return this.expensesService.findById(user.id, expenseId);
  }

  @Post()
  create(
    @Req() { user }: IRequestUser,
    @Body() data: CreateExpenseDTO,
  ): Promise<Expense> {
    return this.expensesService.create(user, {
      ...data,
      userId: user.id,
    });
  }

  @Patch('/:id')
  update(
    @Req() { user }: IRequestUser,
    @Param() { id: expenseId }: UuidParamDTO,
    @Body() dataToUpdate: CreateExpenseDTO,
  ): Promise<Expense> {
    return this.expensesService.update(expenseId, {
      ...dataToUpdate,
      userId: user.id,
    });
  }

  @Delete('/:id')
  delete(
    @Req() { user }: IRequestUser,
    @Param() { id: expenseId }: UuidParamDTO,
  ): Promise<void> {
    return this.expensesService.delete(user.id, expenseId);
  }
}
