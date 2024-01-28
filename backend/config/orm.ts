import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as process from 'process';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'test-system.postgres',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'test-system',
  password: process.env.DB_PASSWORD ?? 'test-system',
  database: process.env.DB_DATABASE ?? 'test-system',
  synchronize: true,
};
