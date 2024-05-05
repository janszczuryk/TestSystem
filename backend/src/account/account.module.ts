import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { LearnerAccount } from './entities/learner-account.entity';
import { TeacherAccount } from './entities/teacher-account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, LearnerAccount, TeacherAccount]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
