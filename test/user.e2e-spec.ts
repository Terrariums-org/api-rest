import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { User } from '../src/users/infraestructure/ports/mysql/user.entity';
import { UsersModule } from '../src/users/infraestructure/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUsersRepository } from '../src/users/__tests__/mocks/userRepository.mock';
import { UserProfile } from '../src/users/infraestructure/ports/mysql/user_profile.entity';
import { AuthModule } from '../src/auth/infraestructure/auth.module';
import { UserInterface } from '../src/users/domain/entities';
import { userStub } from '../src/users/__tests__/stub/user.stub';
import { CreateLoginDTO } from 'src/auth/domain/dto/create-login.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let userToExperiment: UserInterface;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthModule]
    })
      .overrideProvider(getRepositoryToken(UserProfile))
      .useValue(mockUsersRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    userToExperiment = userStub()[0];
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

  describe('DELETE /', () => {
    it('Should not delete and get a status 401', () => {
      return request(app.getHttpServer())
        .delete('/users/1')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('Should delete and get a status 200', async () => {
      return request(app.getHttpServer())
        .delete('/users/1')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);
    });

    it('Should not delete and get a status 404', async () => {
      return request(app.getHttpServer())
        .delete('/users/0')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .expect(HttpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body).toStrictEqual({
            statusCode: 404,
            message: 'NOT_FOUND : No affected user',
          });
        });
    });
  });

  describe('PATCH /', () => {
    it('Should not update and get a status 401', () => {
      return request(app.getHttpServer())
        .patch('/users')
        .send(userToExperiment)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('Should not update and get an error for wrong data', () => {
      return request(app.getHttpServer())
        .patch('/users')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          username: '',
          passwordUser: 'string',
          email: '',
          userProfile: {
            name: '',
            last_name: '',
          },
        })
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toStrictEqual({
            message: [
              'username should not be empty',
              'email must be an email',
              'email should not be empty',
            ],
            error: 'Bad Request',
            statusCode: 400,
          }),
        );
    });

    it('Should update and get a status 200', () => {
      const updateUser = { ...userToExperiment, username: 'FernandoUpdated' };
      return request(app.getHttpServer())
        .patch('/users')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(updateUser)
        .expect(200);
    });
  });
});
