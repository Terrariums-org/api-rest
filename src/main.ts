import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserProfile,
  UpdateUserDto,
  UpdateUserProfile,
} from './users/domain/dto';
import {
  CreateTerrariumDto,
  CreateTerrariumProfileDto,
  UpdateTerrariumDto,
  UpdateTerrariumProfile,
} from './terrariums/domain/dto';
import { CreateLoginDTO } from './auth/domain/dto/create-login.dto';

async function startServer() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest example')
    .setDescription('The animalitos API description')
    .setVersion('1.0')
    .addTag('animalitos')
    .build();

  app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api');
  const configOptions: SwaggerDocumentOptions = {
    extraModels: [
      CreateUserDto,
      UpdateUserDto,
      CreateUserProfile,
      UpdateUserProfile,
      CreateTerrariumDto,
      UpdateTerrariumDto,
      CreateTerrariumProfileDto,
      UpdateTerrariumProfile,
      CreateLoginDTO,
    ],
  };
  const document = SwaggerModule.createDocument(app, config, configOptions);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

startServer();
