import { Module } from '@nestjs/common';

import { AccountModule } from '@module/account/account.module';
import { TestInstanceModule } from '@module/test-instance/test-instance.module';
import { TestInstanceLearnerModule } from '@module/test-instance-learner/test-instance-learner.module';
import { TestInstanceLearnerAnswerModule } from '@module/test-instance-learner-answer/test-instance-learner-answer.module';
import { TestInstanceQuestionModule } from '@module/test-instance-question/test-instance-question.module';

import { LearnerController } from './learner.controller';
import { LearnerService } from './learner.service';

@Module({
  imports: [
    AccountModule,
    TestInstanceModule,
    TestInstanceQuestionModule,
    TestInstanceLearnerModule,
    TestInstanceLearnerAnswerModule,
  ],
  controllers: [LearnerController],
  providers: [LearnerService],
})
export class LearnerModule {}
