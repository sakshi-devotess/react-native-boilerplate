import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Internal server error';

    if (exception instanceof QueryFailedError) {
      const err = exception as QueryFailedError & {
        code?: string;
        detail?: string;
      };
      message = `Database error: ${err.detail || err.message || 'Query failed'}`;

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest().url,
      });
    }

    if (exception instanceof HttpException) {
      const data = exception.getResponse();

      if (data && typeof data === 'object' && 'message' in data) {
        const msg = (data as any).message;
        if (Array.isArray(msg)) {
          message = msg;
        } else if (typeof msg === 'string') {
          message = msg;
        }
      } else if (typeof data === 'string') {
        message = data;
      }
    }

    return response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
