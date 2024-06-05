import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { AccountService } from '@module/account/account.service';
import { Account } from '@module/account/entities/account.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(PassportLocalStrategy) {
  public constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      property: 'account',
    });
  }

  public async validate(email: string, password: string): Promise<Account> {
    const account = await this.accountService.find({ email });
    if (!account) {
      throw new UnauthorizedException();
    }

    const passwordIsCorrect = await this.authService.accountMatchesPassword(account, password);
    if (!passwordIsCorrect) {
      throw new UnauthorizedException();
    }

    return account;
  }
}
