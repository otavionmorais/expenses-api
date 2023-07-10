import { IPaginatedList } from '../app.structures';
import { Expense } from './expenses.entity';

export const expenseMock = new Expense();

Object.assign(expenseMock, {
  id: '18c2a454-2af8-46a5-bbe0-f5ced264da59',
  userId: '957e79fd-a744-44d9-894a-ec21f95e2774',
  description: 'Example Expense',
  amount: 100,
  date: '2023-01-01T03:00:00.000Z',
  createdAt: '2023-01-01T03:00:00.000Z',
  updatedAt: '2023-01-01T03:00:00.000Z',
});

export const expensesListMock = {
  page: 0,
  totalItems: 1,
  itemsPerPage: 20,
  items: [expenseMock],
} as IPaginatedList<Expense>;
