import { AppConfig, DatabaseConfig } from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { LearnerModule } from './learner/learner.module';
import { SubjectModule } from './subject/subject.module';
import { TestInstanceModule } from './test-instance/test-instance.module';
import { TestInstanceLearnerModule } from './test-instance-learner/test-instance-learner.module';
import { TestInstanceLearnerAnswerModule } from './test-instance-learner-answer/test-instance-learner-answer.module';
import { TestInstanceQuestionModule } from './test-instance-question/test-instance-question.module';
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
    TestInstanceQuestionModule,
    TestSchemaModule,
    TestSchemaQuestionModule,
    TestInstanceLearnerModule,
    TestInstanceLearnerAnswerModule,
    LearnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
