import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestInstanceQuestion } from './entities/test-instance-question.entity';
import { TestInstanceQuestionService } from './test-instance-question.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstanceQuestion])],
  controllers: [],
  providers: [TestInstanceQuestionService],
  exports: [TestInstanceQuestionService],
})
export class TestInstanceQuestionModule {}
