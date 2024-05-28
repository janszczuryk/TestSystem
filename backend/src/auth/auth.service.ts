import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Account } from '@module/account/entities/account.entity';

import { JwtPayload } from './auth.type';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  public constructor(private readonly jwtService: JwtService) {}

  public async generateJwtToken(account: Account): Promise<string> {
    const jwtPayload: JwtPayload = {
      sub: account.id,
      accountEmail: account.email,
      accountType: account.type,
    };

    return this.jwtService.signAsync(jwtPayload);
  }

  public async accountMatchesPassword(account: Account, password: string): Promise<boolean> {
    return bcrypt.compare(password, account.password);
  }

  public async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);

    return bcrypt.hash(password, salt);
  }
}
