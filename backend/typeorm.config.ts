import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
});
