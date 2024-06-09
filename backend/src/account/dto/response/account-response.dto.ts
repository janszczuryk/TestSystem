import { Account } from '@module/account/entities/account.entity';

export class AccountResponseDto {
  public readonly id: string;
  public readonly email: string;
  public readonly isVerified: boolean;
  public readonly type: string;

  public constructor(account: Account) {
    this.id = account.id;
    this.email = account.email;
    this.isVerified = account.isVerified;
    this.type = account.type;
  }
}
