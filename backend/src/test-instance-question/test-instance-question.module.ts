import { Module } from '@nestjs/common';
import { TestInstanceQuestionService } from './test-instance-question.service';
import { TestInstanceQuestionController } from './test-instance-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestInstanceQuestion } from './entities/test-instance-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestInstanceQuestion])],
  controllers: [TestInstanceQuestionController],
  providers: [TestInstanceQuestionService],
})
export class TestInstanceQuestionModule {}
