import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectModule } from '@module/subject/subject.module';

import { TestSchema } from './entities/test-schema.entity';
import { TestSchemaController } from './test-schema.controller';
import { TestSchemaService } from './test-schema.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestSchema]), SubjectModule],
  controllers: [TestSchemaController],
  providers: [TestSchemaService],
})
export class TestSchemaModule {}
