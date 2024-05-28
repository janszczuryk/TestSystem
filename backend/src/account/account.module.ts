import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { LearnerAccount } from './entities/learner-account.entity';
import { TeacherAccount } from './entities/teacher-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, LearnerAccount, TeacherAccount])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
