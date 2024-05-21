import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestSchema } from './entities/test-schema.entity';
import { TestSchemaController } from './test-schema.controller';
import { TestSchemaService } from './test-schema.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestSchema])],
  controllers: [TestSchemaController],
  providers: [TestSchemaService],
})
export class TestSchemaModule {}
