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
import { User, UserProfile } from '../src/users/infraestructure/ports/mysql';
import { mockUsersRepository } from '../src/users/__tests__/mocks/userRepository.mock';
import { TerrariumsInterface } from '../src/terrariums/domain/entities';
import { CreateTerrariumDto } from 'src/terrariums/domain/dto';

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
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .overrideProvider(getRepositoryToken(UserProfile))
      .useValue(mockUsersRepository)
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

  describe('GET /terrariums', () => {
    describe('/', () => {
      it('Should not get all terrariums and get a status 401', () => {
        return request(app.getHttpServer())
          .get('/terrariums')
          .expect(HttpStatus.UNAUTHORIZED);
      });

      it('Should get all the terrariums', () => {
        return request(app.getHttpServer())
          .get('/terrariums')
          .set('authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)
          .then((res) => {
            const terrariumList = res.body;
            expect(terrariumList).toHaveLength(4);
            expect(terrariumList).toMatchObject<TerrariumsInterface[]>(
              terrariumList,
            );
          });
      });
    });
    describe('/:id', () => {
      it('Should not get  terrariums and get a status 401', () => {
        return request(app.getHttpServer())
          .get('/terrariums/0')
          .expect(HttpStatus.UNAUTHORIZED);
      });
      it('Should get a terrarium', () => {
        return request(app.getHttpServer())
          .get('/terrariums/1')
          .set('authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)
          .then((res) => {
            const terrarium = res.body;
            expect(terrarium).not.toBeNull();
            expect(terrarium).toMatchObject<TerrariumsInterface>(terrarium);
          });
      });
      it('Should get a "NOT_FOUND" status for inexistent id', () => {
        return request(app.getHttpServer())
          .get('/terrariums/0')
          .set('authorization', `Bearer ${token}`)
          .expect(HttpStatus.NOT_FOUND)
          .then((res) =>
            expect(res.body).toStrictEqual({
              statusCode: 404,
              message: 'NOT_FOUND : Terrario no encontrado',
            }),
          );
      });
    });
  });

  describe('DELETE /terrariums/:id', () => {
    it('Should not delete a terrarium and get a status 401', () => {
      return request(app.getHttpServer())
        .delete('/terrariums/1')
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it('Should get a "NOT_FOUND" status for inexistent id', () => {
      return request(app.getHttpServer())
        .delete('/terrariums/0')
        .set('authorization', `Bearer ${token}`)
        .expect(HttpStatus.NOT_FOUND)
        .then((res) =>
          expect(res.body).toStrictEqual({
            statusCode: 404,
            message: 'NOT_FOUND : Terrario no encontrado',
          }),
        );
    });
    it('Should delete a terrarium', () => {
      return request(app.getHttpServer())
        .delete('/terrariums/1')
        .set('authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);
    });
  });

  describe('POST /terrariums', () => {
    it('Should not create a terrarium and get a status 401', () => {
      return request(app.getHttpServer())
        .post('/terrariums')
        .send({
          id: 4,
          name: 'Terrario',
          terrariumProfile: {},
          user: {
            id: 1,
          },
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it('Should not create and get a "BAD_REQUEST" status for invalid data', () => {
      return request(app.getHttpServer())
        .post('/terrariums')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          id: 10,
          name: 'Terrario',
          terrariumProfile: {},
          user: {
            id: 1,
          },
        })
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).toStrictEqual({
            message: ['terrariumProfile must be a non-empty object'],
            error: 'Bad Request',
            statusCode: 400,
          });
        });
    });
    it('Should create a new Terrarium and return a status 201', () => {
      const terrariumReq: CreateTerrariumDto = {
        id: 5,
        name: 'Terrario',
        terrariumProfile: {
          id: 5,
          max_temp: 40,
          min_temp: 5,
          max_humidity: 50,
          min_humidity: 30,
          max_uv: 50,
          min_uv: 25,
        },
        user: {
          id: 1,
        },
      };
      return request(app.getHttpServer())
        .post('/terrariums')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(terrariumReq)
        .expect(HttpStatus.CREATED)
        .then((res) => {
          expect(res.body).not.toBeNull();
          expect(res.body).toMatchObject<CreateTerrariumDto>(terrariumReq);
        });
    });
  });
});
