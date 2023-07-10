import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { userMock } from './user.mocks';

export function CreateUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Creates a new user.',
    }),
    ApiCreatedResponse({
      content: {
        'application/json': {
          example: userMock,
        },
      },
    }),
  );
}

export function LoginDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login an user.',
    }),
    ApiCreatedResponse({
      content: {
        'application/json': {
          example: {
            access_token: 'ey...',
            expires_in: 86400,
          },
        },
      },
    }),
  );
}

export function GetUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get the current user.',
    }),
    ApiOkResponse({
      content: {
        'application/json': {
          example: userMock,
        },
      },
    }),
    ApiBearerAuth('userAuth'),
  );
}

export function UpdateUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update the current user.',
    }),
    ApiOkResponse({
      content: {
        'application/json': {
          example: userMock,
        },
      },
    }),
    ApiBearerAuth('userAuth'),
  );
}

export function DeleteUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete the current user.',
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
