import {
  HttpException,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';

export enum ErrorCode {
  INFRASTRUCTURE_PROBLEM = 'INFRASTRUCTURE_PROBLEM',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EXPENSE_NOT_FOUND = 'EXPENSE_NOT_FOUND',
}

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status || 500;

    let message = 'An error occured. Please try again later.';
    let error = exception.response?.error || ErrorCode.INFRASTRUCTURE_PROBLEM;

    // For ValidationPipe
    if (error === 'Bad Request') {
      error = ErrorCode.BAD_REQUEST;
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse?.() as {
        message: string | string[];
      };

      if (response?.message) {
        message = Array.isArray(response.message)
          ? response.message[0]
          : response.message;
      } else {
        message = exception.message;
      }
    } else {
      console.error(exception);
    }

    response.status(status).json({
      statusCode: status,
      error,
      message,
    });
  }
}
