import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestInstanceResult } from './entities/test-instance-result.entity';
import { TestInstanceResultController } from './test-instance-result.controller';
import { TestInstanceResultService } from './test-instance-result.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstanceResult])],
  controllers: [TestInstanceResultController],
  providers: [TestInstanceResultService],
})
export class TestInstanceResultModule {}
