import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { config } from '../config/orm';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...config, autoLoadEntities: true }),
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
