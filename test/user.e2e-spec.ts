import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User } from '../src/users/infraestructure/ports/mysql/user.entity';
import { UsersModule } from '../src/users/infraestructure/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUsersRepository } from '../src/users/tests/mocks/userRepository.mock';
import { UserProfile } from '../src/users/infraestructure/ports/mysql/user_profile.entity';
import { AuthModule } from '../src/auth/infraestructure/auth.module';
import { UserInterface } from '../src/users/domain/entities';
import { userStub } from '../src/users/tests/stub/user.stub';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userToExperiment: UserInterface;
  let userWrongData: UserInterface;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthModule],
    })
      .overrideProvider(getRepositoryToken(UserProfile))
      .useValue(mockUsersRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userToExperiment = userStub()[0];
    userWrongData = {
      ...userStub()[1],
      email: 'Invalid email',
    };
  });

  describe('DELETE /', () => {
    it('Should not delete and get a status 401', () => {
      return request(app.getHttpServer()).delete('/users/1').expect(401);
    });

    //   it('Should delete and get a status 200', () => {
    // ? remember to first do login
    //     return request(app.getHttpServer()).delete('/users/1').expect(200);
    //   });
  });

  describe('PATCH /', () => {
    it('Should not update and get a status 401', () => {
      return request(app.getHttpServer())
        .patch('/users')
        .send(userToExperiment)
        .expect(401);
    });

    // it('Should not update and get an error for wrong data', () => {
    //   return request(app.getHttpServer()).patch('/users').send(userWrongData).expect(); change for the correct status code
    // });

    // it('Should update and get a status 200', () => {
    // const updateUser = { ...userToExperiment, username: 'FernandoUpdated' };
    // ? remember to first do login
    //     return request(app.getHttpServer()).patch('/users').send().expect(200);
    //   });
  });
});
