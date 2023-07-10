import { DATASOURCE_INJECTION_TOKEN } from '../app.constants';
import { expensesDataSource } from './expenses.datasource';

export const DatabaseProvider = {
  provide: DATASOURCE_INJECTION_TOKEN,
  useValue: expensesDataSource,
};
