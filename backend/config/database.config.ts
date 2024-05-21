import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: Boolean(parseInt(process.env.DB_SYNCHRONIZE ?? '0', 10)),
  logging: Boolean(parseInt(process.env.DB_LOGGING ?? '0', 10)),
}));
