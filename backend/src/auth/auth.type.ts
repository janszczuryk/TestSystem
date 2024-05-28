import { AccountType } from '@module/account/entities/account.entity';

export class JwtPayload {
  public readonly sub: string;
  public readonly accountEmail: string;
  public readonly accountType: AccountType;
}

export class JwtParams {
  public readonly accountId: string;
  public readonly accountEmail: string;
  public readonly accountType: AccountType;
}
