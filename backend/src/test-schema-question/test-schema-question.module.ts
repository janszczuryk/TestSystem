import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestSchemaQuestion } from './entities/test-schema-question.entity';
import { TestSchemaQuestionController } from './test-schema-question.controller';
import { TestSchemaQuestionService } from './test-schema-question.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestSchemaQuestion])],
  controllers: [TestSchemaQuestionController],
  providers: [TestSchemaQuestionService],
})
export class TestSchemaQuestionModule {}
