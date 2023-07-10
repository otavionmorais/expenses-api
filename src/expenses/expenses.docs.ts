import { applyDecorators } from '@nestjs/common';
import { expenseMock, expensesListMock } from './expenses.mocks';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

export function CreateExpenseDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Creates a new expense.',
    }),
    ApiCreatedResponse({
      content: {
        'application/json': {
          example: expenseMock,
        },
      },
    }),
    ApiBearerAuth('userAuth'),
  );
}

export function ListExpensesDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'List expenses.',
    }),
    ApiOkResponse({
      content: {
        'application/json': {
          example: expensesListMock,
        },
      },
    }),
    ApiBearerAuth('userAuth'),
  );
}

export function GetExpenseDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get an expense.',
    }),
    ApiOkResponse({
      content: {
        'application/json': {
          example: expenseMock,
        },
      },
    }),
    ApiBearerAuth('userAuth'),
  );
}

export function UpdateExpenseDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update an expense.',
    }),
    ApiOkResponse({
      content: {
        'application/json': {
          example: expenseMock,
        },
      },
    }),
    ApiBearerAuth('userAuth'),
  );
}

export function DeleteExpenseDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete an expense.',
    }),
    ApiOkResponse({
      content: {
        'application/json': {
          example: '',
        },
      },
    }),
    ApiBearerAuth('userAuth'),
  );
}
