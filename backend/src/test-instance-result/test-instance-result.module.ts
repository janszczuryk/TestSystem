import { Module } from '@nestjs/common';
import { TestInstanceResultService } from './test-instance-result.service';
import { TestInstanceResultController } from './test-instance-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestInstanceResult } from './entities/test-instance-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstanceResult])],
  controllers: [TestInstanceResultController],
  providers: [TestInstanceResultService],
})
export class TestInstanceResultModule {}
