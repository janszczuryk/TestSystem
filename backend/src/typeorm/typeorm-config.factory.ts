import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeormConfigFactory implements TypeOrmOptionsFactory {
  private readonly configService: ConfigService;

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      autoLoadEntities: true,
      synchronize: this.configService.get<boolean>('database.synchronize'),
      logging: this.configService.get<boolean>('database.logging'),
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
