import * as request from 'supertest';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../src/auth/infraestructure/auth.module';
import {
  Terrariums,
  TerrariumsProfile,
} from '../src/terrariums/infraestructure/ports/mysql';
import { mockTerrariumsRepository } from '../src/terrariums/__tests__/mocks/terrariumRepository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TerrariumsModule } from '../src/terrariums/infraestructure/terrariums.module';
import { CreateLoginDTO } from '../src/auth/domain/dto/create-login.dto';

describe('Terrariums controller (e2e)', () => {
  let app: INestApplication;
  let token: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TerrariumsModule, AuthModule],
    })
      .overrideProvider(getRepositoryToken(Terrariums))
      .useValue(mockTerrariumsRepository)
      .overrideProvider(getRepositoryToken(TerrariumsProfile))
      .useValue(mockTerrariumsRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    const data: CreateLoginDTO = {
      email: 'ana@example.com',
      passwordUser: 'contraseña',
    };
    await request(app.getHttpServer())
      .post('/auth/login')
      .set('Content-type', 'application/json')
      .send(data)
      .expect(HttpStatus.ACCEPTED)
      .then(async (res) => {
        token = await res.body['token'];
        expect(res.body).toHaveProperty('token');
      });
  });
});
