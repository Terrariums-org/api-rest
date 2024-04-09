import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { CreateLoginDTO } from '../../../../auth/domain/dto/create-login.dto';
import {
  CreateTerrariumDto,
  CreateTerrariumProfileDto,
  UpdateTerrariumDto,
  UpdateTerrariumProfile,
} from '../../../../terrariums/domain/dto';
import {
  CreateUserDto,
  CreateUserProfile,
  UpdateUserDto,
  UpdateUserProfile,
} from '../../../../users/domain/dto';

export const setUp = (app: INestApplication) => {
  app.setGlobalPrefix('api');
  //auth
  app.enableCors();
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  //config .env
  app.get(ConfigService);
  //pipes from dtos
  app.useGlobalPipes(
    new ValidationPipe(),
  );
  //swagger
  const config = new DocumentBuilder()
    .setTitle('Nest example')
    .setDescription('The animalitos API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token value, without key "Bearer"',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
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
  return app;
};
