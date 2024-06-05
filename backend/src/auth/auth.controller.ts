import { Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AccountService } from '@module/account/account.service';
import { Account, AccountCreateProps, AccountType } from '@module/account/entities/account.entity';
import { ChangePasswordBodyDto } from '@module/auth/dto/change-password-body.dto';

import { AuthService } from './auth.service';
import { JwtParams } from './auth.type';
import { AccountTypes, AuthAccount, AuthJwt } from './decorators';
import { RegisterBodyDto } from './dto/register-body.dto';
import { AccountTypeGuard, JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  public async login(@AuthAccount() account: Account) {
    const jwtToken = await this.authService.generateJwtToken(account);

    return {
      token: jwtToken,
    };
  }

  @Post('register')
  public async register(@Body() body: RegisterBodyDto) {
    const existingAccount = await this.accountService.find({
      email: body.email,
    });
    if (existingAccount) {
      throw new ConflictException('Account with given email address already exists');
    }

    const encryptedPassword = await this.authService.encryptPassword(body.password);

    const createAccountProps: AccountCreateProps = {
      email: body.email,
      password: encryptedPassword,
      type: body.type,
      isVerified: false,
    };
    const account = await this.accountService.create(createAccountProps);
    account && (account.password = '');

    return { account };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  public async changePassword(@AuthJwt() { accountId }: JwtParams, @Body() body: ChangePasswordBodyDto) {
    let account = await this.accountService.get(accountId);
    if (!account) {
      throw new Error('Account does not exist');
    }

    const passwordMatches = await this.authService.accountMatchesPassword(account, body.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const encryptedNewPassword = await this.authService.encryptPassword(body.newPassword);

    account = await this.accountService.update(account, {
      password: encryptedNewPassword,
    });

    account && (account.password = '');

    return { account };
  }

  // TODO: Remove
  @Get('account')
  @UseGuards(JwtAuthGuard, AccountTypeGuard)
  @AccountTypes([AccountType.LEARNER])
  public async getAccount(@AuthJwt() { accountId }: JwtParams) {
    const account = await this.accountService.get(accountId);
    account && (account.password = '');

    return { account };
  }
}
