import { Module } from '@nestjs/common';
import { TypeormConfigFactory } from './typeorm-config.factory';

@Module({
  imports: [],
  providers: [TypeormConfigFactory],
  controllers: [],
})
export class TypeormModule {}
