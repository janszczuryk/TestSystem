import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AccountService } from '@module/account/account.service';
import { AccountResponseDto } from '@module/account/dto/response';
import { Account, AccountCreateProps, AccountType } from '@module/account/entities/account.entity';
import { LearnerAccount } from '@module/account/entities/learner-account.entity';
import { TeacherAccount } from '@module/account/entities/teacher-account.entity';

import { AuthService } from './auth.service';
import { JwtParams } from './auth.type';
import { AuthAccount, AuthJwt } from './decorators';
import { ChangePasswordBodyDto, RegisterBodyDto } from './dto/body';
import { LoginResponseDto } from './dto/response';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

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

    return new LoginResponseDto({ jwtToken });
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
      isVerified: false,
    };

    let account: Account;
    if (body.type === AccountType.LEARNER) {
      account = LearnerAccount.create(createAccountProps);
    } else if (body.type === AccountType.TEACHER) {
      account = TeacherAccount.create(createAccountProps);
    } else {
      throw new Error('Unsupported account type');
    }

    account = await this.accountService.create(account);

    return new AccountResponseDto(account);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  public async changePassword(@AuthJwt() { accountId }: JwtParams, @Body() body: ChangePasswordBodyDto) {
    let account: Account | null = await this.accountService.get(accountId);
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

    return new AccountResponseDto(account);
  }
}
