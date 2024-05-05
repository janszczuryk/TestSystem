import { Module } from '@nestjs/common';
import { TestInstanceService } from './test-instance.service';
import { TestInstanceController } from './test-instance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestInstance } from './entities/test-instance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstance])],
  controllers: [TestInstanceController],
  providers: [TestInstanceService],
})
export class TestInstanceModule {}
