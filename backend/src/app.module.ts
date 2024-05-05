import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import { AccountModule } from './account/account.module';
import { TypeormConfigFactory } from './typeorm/typeorm-config.factory';
import { SubjectModule } from './subject/subject.module';
import { TestSchemaQuestionModule } from './test-schema-question/test-schema-question.module';
import { TestInstanceModule } from './test-instance/test-instance.module';
import { TestInstanceResultModule } from './test-instance-result/test-instance-result.module';
import { TestSchemaModule } from './test-schema/test-schema.module';
import { TestInstanceQuestionModule } from './test-instance-question/test-instance-question.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, databaseConfig] }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigFactory }),
    AccountModule,
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
