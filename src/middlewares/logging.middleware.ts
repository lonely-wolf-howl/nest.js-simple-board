import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  private readonly Logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;

      this.Logger.log(
        `[${method}] ${originalUrl} : ${statusCode} : ${responseTime}ms`,
      );
    });

    next();
  }
}
