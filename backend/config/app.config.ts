import { registerAs } from '@nestjs/config';

import * as process from 'process';

export default registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT ?? '8080', 10),
  jwtSecretKey: process.env.JWT_SECRET_KEY ?? '',
  environment: process.env.NODE_ENV ?? 'production',
}));
