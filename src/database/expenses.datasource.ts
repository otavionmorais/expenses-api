import { join } from 'path';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const expensesDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '/migrations/', '*.{ts,js}')],
});
