import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { JwtParams } from '../auth.type';

function isJwtParams(object: any): object is JwtParams {
  return object instanceof JwtParams;
}

export const AuthJwt = createParamDecorator((data: unknown, ctx: ExecutionContext): JwtParams => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.user || !isJwtParams(request.user)) {
    throw new Error('Request user must be the JwtParams type');
  }

  return request.user as JwtParams;
});
