import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUp } from './shared/config/application/utils';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  const setUpApp = setUp(app);
  await setUpApp.listen(3000);
}

startServer();
