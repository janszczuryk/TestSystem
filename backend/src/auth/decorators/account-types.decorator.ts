import { Reflector } from '@nestjs/core';

import { AccountType } from '@module/account/entities/account.entity';

export const AccountTypes = Reflector.createDecorator<AccountType[]>();
