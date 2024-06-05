import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestSchemaModule } from '@module/test-schema/test-schema.module';

import { TestSchemaQuestion } from './entities/test-schema-question.entity';
import { TestSchemaQuestionController } from './test-schema-question.controller';
import { TestSchemaQuestionService } from './test-schema-question.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestSchemaQuestion]), TestSchemaModule],
  controllers: [TestSchemaQuestionController],
  providers: [TestSchemaQuestionService],
  exports: [TestSchemaQuestionService],
})
export class TestSchemaQuestionModule {}
