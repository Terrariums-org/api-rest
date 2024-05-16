import { Test } from '@nestjs/testing';
import { AuthService } from '../aplication/services/auth.service';
import { TokenService } from '../aplication/services/token.service';
import { HashedPasswordService } from '../aplication/services/hashedPassword.service';
import { TokenRepositoryImp } from '../infraestructure/ports/TokenRepositoryImp.port';
import { BcryptRepositoryImp } from '../infraestructure/ports/BcryptRepositoryImp.port';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/infraestructure/ports/mysql/user.entity';
import { mockUsersRepository } from '../../users/__tests__/mocks/userRepository.mock';
import { DecodeTokenResInterface, TokenResponse } from '../domain/entities';
import { CreateUserDto } from '../../users/domain/dto';

describe('Auth service', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let hashedPasswordService: HashedPasswordService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        TokenService,
        HashedPasswordService,
        TokenRepositoryImp,
        BcryptRepositoryImp,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();
    authService = moduleRef.get<AuthService>(AuthService);
    tokenService = moduleRef.get<TokenService>(TokenService);
    hashedPasswordService = moduleRef.get<HashedPasswordService>(
      HashedPasswordService,
    );
  });

  test('Auth service should be defined and the implementations that use', () => {
    expect(authService).toBeDefined();
    expect(tokenService).toBeDefined();
    expect(hashedPasswordService).toBeDefined();
  });

  describe('Login Service', () => {
    describe('The Login service should be available to return a valid token', () => {
      let tokenResponse: TokenResponse;
      it('Should return a token', async () => {
        tokenResponse = await authService.loginService({
          email: 'ana@example.com',
          passwordUser: 'contraseña',
        });
        expect(tokenResponse).not.toBeNull();
        expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
      });
      it('The token must be valid', async () => {
        const decodeToken = await tokenService.decodeToken(tokenResponse.token);
        expect(decodeToken).not.toBeNull();
        expect(decodeToken).toStrictEqual<DecodeTokenResInterface>({
          id: 2,
          username: 'anamartinez',
          isExpired: false,
        });
      });
    });
    describe('The login service should not be available to return a token', () => {
      it('Should not return a token and send a status "NOT_FOUND"', async () => {
        await expect(
          authService.loginService({
            email: 'invalidemail@example.com',
            passwordUser: 'invalid-password',
          }),
        ).rejects.toThrow('NOT_FOUND');
        expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(2);
      });

      it('Should not return a token and send a status "UNAUTHORIZED"', async () => {
        await expect(
          authService.loginService({
            email: 'ana@example.com',
            passwordUser: 'invalid-password',
          }),
        ).rejects.toThrow('UNAUTHORIZED');
        expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('Register service', () => {
    describe('The register service should be available to create a new user and return a valid token', () => {
      let tokenResponse: TokenResponse;
      it('Should create a new user and return a token', async () => {
        const userReq: CreateUserDto = {
          id: 4,
          username: 'Fernando_Flores',
          email: 'fernando@gmail.com',
          passwordUser: 'password',
          userProfile: {
            id: 4,
            name: 'Fernando',
            last_name: 'Flores',
          },
        };
        tokenResponse = await authService.registerService(userReq);
        expect(tokenResponse).not.toBeNull();
        expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(5);
      });
      it('The token returned must be valid', async () => {
        const decodeToken = await tokenService.decodeToken(tokenResponse.token);
        expect(decodeToken).not.toBeNull();
        expect(decodeToken).toStrictEqual<DecodeTokenResInterface>({
          id: 4,
          username: 'Fernando_Flores',
          isExpired: false,
        });
      });
    });
    describe('The register service should not be available to create a new user and return a valid token', () => {
      it('Should not create a new user and return a status "CONFLICT"', async () => {
        const userReq: CreateUserDto = {
          id: 4,
          username: 'Fernando_Flores',
          email: 'ana@example.com',
          passwordUser: 'contraseña',
          userProfile: {
            id: 4,
            name: 'Fernando',
            last_name: 'Flores',
          },
        };
        await expect(authService.registerService(userReq)).rejects.toThrow(
          'CONFLICT',
        );
        expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(7);
      });
    });
  });
});
