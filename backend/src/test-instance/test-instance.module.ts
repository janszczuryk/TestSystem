import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from '@module/account/account.module';
import { TestInstanceQuestionModule } from '@module/test-instance-question/test-instance-question.module';
import { TestSchemaModule } from '@module/test-schema/test-schema.module';
import { TestSchemaQuestionModule } from '@module/test-schema-question/test-schema-question.module';

import { TestInstance } from './entities/test-instance.entity';
import { TestInstanceController } from './test-instance.controller';
import { TestInstanceService } from './test-instance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestInstance]),
    AccountModule,
    TestSchemaModule,
    TestSchemaQuestionModule,
    TestInstanceQuestionModule,
  ],
  controllers: [TestInstanceController],
  providers: [TestInstanceService],
  exports: [TestInstanceService],
})
export class TestInstanceModule {}
