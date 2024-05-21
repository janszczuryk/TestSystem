import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestInstance } from './entities/test-instance.entity';
import { TestInstanceController } from './test-instance.controller';
import { TestInstanceService } from './test-instance.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstance])],
  controllers: [TestInstanceController],
  providers: [TestInstanceService],
})
export class TestInstanceModule {}
