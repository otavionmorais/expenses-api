import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { expensesDataSource } from './database/expenses.datasource';
import { ApplicationExceptionFilter } from './app.errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ApplicationExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (process.env.NODE_ENV !== 'test' && !expensesDataSource.isInitialized) {
    expensesDataSource.initialize();
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
