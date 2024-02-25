import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  app.get(ConfigService);
  app.setGlobalPrefix("api")
  await app.listen(3000);
}

startServer();
