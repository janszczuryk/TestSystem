import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestInstanceLearner } from './entities/test-instance-learner.entity';
import { TestInstanceLearnerController } from './test-instance-learner.controller';
import { TestInstanceLearnerService } from './test-instance-learner.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstanceLearner])],
  controllers: [TestInstanceLearnerController],
  providers: [TestInstanceLearnerService],
})
export class TestInstanceLearnerModule {}
