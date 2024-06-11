import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestInstanceLearnerAnswer } from './entities/test-instance-learner-answer.entity';
import { TestInstanceLearnerAnswerService } from './test-instance-learner-answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstanceLearnerAnswer])],
  providers: [TestInstanceLearnerAnswerService],
  exports: [TestInstanceLearnerAnswerService],
})
export class TestInstanceLearnerAnswerModule {}
