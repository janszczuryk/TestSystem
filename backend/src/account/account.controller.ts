import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtParams } from '@module/auth/auth.type';
import { AccountTypes, AuthJwt } from '@module/auth/decorators';
import { AccountTypeGuard, JwtAuthGuard } from '@module/auth/guards';

import { AccountService } from './account.service';
import { LearnerAccountResponseDto, TeacherAccountResponseDto } from './dto/response';
import { AccountType } from './entities/account.entity';

@Controller('accounts')
@UseGuards(JwtAuthGuard, AccountTypeGuard)
export class AccountController {
  public constructor(private readonly accountService: AccountService) {}

  @Get('learner/@me')
  @AccountTypes([AccountType.LEARNER])
  public async findLearnerMe(@AuthJwt() { accountId }: JwtParams) {
    const learner = await this.accountService.get(accountId, AccountType.LEARNER);
    if (!learner) {
      throw new Error('Learner account does not exist');
    }

    return new LearnerAccountResponseDto(learner);
  }

  @Get('teacher/@me')
  @AccountTypes([AccountType.TEACHER])
  public async findTeacherMe(@AuthJwt() { accountId }: JwtParams) {
    const teacher = await this.accountService.get(accountId, AccountType.TEACHER);
    if (!teacher) {
      throw new Error('Teacher account does not exist');
    }

    return new TeacherAccountResponseDto(teacher);
  }
}
