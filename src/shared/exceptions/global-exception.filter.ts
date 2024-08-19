import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()['message']
        : (exception as Error).message;

    if (!message && exception.message) {
      message = exception.message;
    }

    if (exception.code == '23503') {
      message = 'update or delete violates foreign key constraint';
    }

    const responseData = {
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
      exception: exception.code != '23503' ? exception : {},
    };

    this.logger.error(responseData);

    response.status(status).json(responseData);
    return;
  }
}
