import { AppConfig, DatabaseConfig } from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';
import { TestInstanceModule } from './test-instance/test-instance.module';
import { TestInstanceQuestionModule } from './test-instance-question/test-instance-question.module';
import { TestInstanceResultModule } from './test-instance-result/test-instance-result.module';
import { TestSchemaModule } from './test-schema/test-schema.module';
import { TestSchemaQuestionModule } from './test-schema-question/test-schema-question.module';
import { TypeormConfigFactory } from './typeorm/typeorm-config.factory';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig, DatabaseConfig] }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigFactory }),
    AccountModule,
    AuthModule,
    SubjectModule,
    TestInstanceModule,
    TestInstanceResultModule,
    TestInstanceQuestionModule,
    TestSchemaModule,
    TestSchemaQuestionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
