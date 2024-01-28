import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = +(process.env.APP_PORT ?? 8080);
  await app.listen(appPort);
}

bootstrap();
