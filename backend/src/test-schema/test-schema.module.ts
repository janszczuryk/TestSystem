import { Module } from '@nestjs/common';
import { TestSchemaService } from './test-schema.service';
import { TestSchemaController } from './test-schema.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestSchema } from './entities/test-schema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestSchema])],
  controllers: [TestSchemaController],
  providers: [TestSchemaService],
})
export class TestSchemaModule {}
