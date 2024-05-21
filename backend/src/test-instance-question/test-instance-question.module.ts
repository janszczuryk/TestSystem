import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestInstanceQuestion } from './entities/test-instance-question.entity';
import { TestInstanceQuestionController } from './test-instance-question.controller';
import { TestInstanceQuestionService } from './test-instance-question.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstanceQuestion])],
  controllers: [TestInstanceQuestionController],
  providers: [TestInstanceQuestionService],
})
export class TestInstanceQuestionModule {}
