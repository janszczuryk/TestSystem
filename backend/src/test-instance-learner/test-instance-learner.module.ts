import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from '@module/account/account.module';
import { TestInstanceModule } from '@module/test-instance/test-instance.module';

import { TestInstanceLearner } from './entities/test-instance-learner.entity';
import { TestInstanceLearnerController } from './test-instance-learner.controller';
import { TestInstanceLearnerService } from './test-instance-learner.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstanceLearner]), AccountModule, forwardRef(() => TestInstanceModule)],
  controllers: [TestInstanceLearnerController],
  providers: [TestInstanceLearnerService],
  exports: [TestInstanceLearnerService],
})
export class TestInstanceLearnerModule {}
