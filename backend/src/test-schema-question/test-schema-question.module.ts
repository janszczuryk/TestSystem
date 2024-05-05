import { Module } from '@nestjs/common';
import { TestSchemaQuestionService } from './test-schema-question.service';
import { TestSchemaQuestionController } from './test-schema-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestSchemaQuestion } from './entities/test-schema-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestSchemaQuestion])],
  controllers: [TestSchemaQuestionController],
  providers: [TestSchemaQuestionService],
})
export class TestSchemaQuestionModule {}
