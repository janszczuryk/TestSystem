import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { JwtParams } from '../auth.type';
import { AccountTypes } from '@module/auth/decorators';

function isJwtParams(object: any): object is JwtParams {
  return object instanceof JwtParams;
}

@Injectable()
export class AccountTypeGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(AccountTypes, context.getHandler());
    if (!roles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!isJwtParams(request.user)) {
      throw new Error('Request user must be the JwtParams type');
    }

    const jwtParams = request.user as JwtParams;

    return roles.includes(jwtParams.accountType);
  }
}
