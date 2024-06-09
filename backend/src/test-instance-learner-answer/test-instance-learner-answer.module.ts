import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestInstanceLearnerAnswer } from './entities/test-instance-learner-answer.entity';
import { TestInstanceLearnerAnswerController } from './test-instance-learner-answer.controller';
import { TestInstanceLearnerAnswerService } from './test-instance-learner-answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstanceLearnerAnswer])],
  controllers: [TestInstanceLearnerAnswerController],
  providers: [TestInstanceLearnerAnswerService],
})
export class TestInstanceLearnerAnswerModule {}
