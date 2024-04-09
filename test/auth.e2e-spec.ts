import * as request from 'supertest';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/infraestructure/auth.module';
import { mockUsersRepository } from '../src/users/__tests__/mocks/userRepository.mock';
import { User } from '../src/users/infraestructure/ports/mysql/user.entity';
import { UserProfile } from '../src/users/infraestructure/ports/mysql/user_profile.entity';
import { TokenResponse } from 'src/auth/domain/entities';

describe('Auth controller (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .overrideProvider(getRepositoryToken(UserProfile))
      .useValue(mockUsersRepository)
      .compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('POST /auth', () => {
    describe('/auth/login', () => {
      it('Should not login and get a "BAD_REQUEST" status for empty data', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .set('Content-Type', 'application/json')
          .send({})
          .expect(HttpStatus.BAD_REQUEST)
          .then((res) =>
            expect(res.body).toStrictEqual({
              message: [
                'email should not be empty',
                'email must be an email',
                'email must be a string',
                'passwordUser should not be empty',
                'passwordUser must be a string',
              ],
              error: 'Bad Request',
              statusCode: 400,
            }),
          );
      });

      it('should not login and get a "NOT_FOUND" status for inexistent email', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .set('Content-Type', 'application/json')
          .send({
            email: 'inexistentemail@gmail.com',
            passwordUser: 'contraseña',
          })
          .expect(HttpStatus.NOT_FOUND)
          .then((res) =>
            expect(res.body).toStrictEqual({
              statusCode: 404,
              message: 'NOT_FOUND : Credenciales Invalidas',
            }),
          );
      });

      it('should not login and get a "UNAUTHORIZED" status for wrong password', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .set('Content-Type', 'application/json')
          .send({
            email: 'ana@example.com',
            passwordUser: 'wrongpassword',
          })
          .expect(HttpStatus.UNAUTHORIZED)
          .then((res) =>
            expect(res.body).toStrictEqual({
              statusCode: 401,
              message: 'UNAUTHORIZED : Credenciales invalidas',
            }),
          );
      });

      it('should login and return a token', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .set('Content-Type', 'application/json')
          .send({
            email: 'ana@example.com',
            passwordUser: 'contraseña',
          })
          .expect(HttpStatus.ACCEPTED)
          .then((res) => {
            expect(res.body).not.toBeNull();
            expect(res.body).toMatchObject<TokenResponse>(res.body);
          });
      });
    });
    describe('/auth/register', () => {
      it('Should not register and get a "BAD_REQUEST" status for invalid data', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .set('Content-Type', 'application/json')
          .send({
            username: 'Fernando',
            email: '',
            userProfile: {},
          })
          .expect(HttpStatus.BAD_REQUEST)
          .then((res) =>
            expect(res.body).toStrictEqual({
              message: [
                'passwordUser should not be empty',
                'passwordUser must be a string',
                'email must be an email',
                'email should not be empty',
                'userProfile must be a non-empty object',
              ],
              error: 'Bad Request',
              statusCode: 400,
            }),
          );
      });

      it('Should not register and get a "CONFLICT" status for existing user', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .set('Content-Type', 'application/json')
          .send({
            username: 'Fernando',
            passwordUser: 'contraseña',
            email: 'ana@example.com',
            userProfile: { name: 'Ana', last_name: 'Martínez' },
          })
          .expect(HttpStatus.CONFLICT)
          .then((res) =>
            expect(res.body).toStrictEqual({
              statusCode: 409,
              message:
                'CONFLICT : usuario con email: ana@example.com existente',
            }),
          );
      });

      it('should register and return a token', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .set('Content-Type', 'application/json')
          .send({
            username: 'Fernando',
            passwordUser: 'contraseña',
            email: 'fernando@example.com',
            userProfile: { name: 'Fernando', last_name: 'Flores' },
          })
          .expect(HttpStatus.CREATED)
          .then((res) => {
            expect(res.body).not.toBeNull();
            expect(res.body).toMatchObject<TokenResponse>(res.body);
          });
      });
    });
  });
});
