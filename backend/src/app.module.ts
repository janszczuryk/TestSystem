import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import { AccountModule } from './account/account.module';
import { TypeormConfigFactory } from './typeorm/typeorm-config.factory';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, databaseConfig] }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigFactory }),
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
