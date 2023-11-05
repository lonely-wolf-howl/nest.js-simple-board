import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const IP = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip;
  },
);
