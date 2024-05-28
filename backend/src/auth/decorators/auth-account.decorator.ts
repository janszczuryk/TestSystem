import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Account } from '@module/account/entities/account.entity';

function isAccount(object: any): object is Account {
  return object instanceof Account;
}

export const AuthAccount = createParamDecorator((data: unknown, ctx: ExecutionContext): Account => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.user || !isAccount(request.user)) {
    throw new Error('Request user must be the Account type');
  }

  return request.user as Account;
});
