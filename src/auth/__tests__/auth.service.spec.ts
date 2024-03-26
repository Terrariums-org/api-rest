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

  it('Auth service should be defined and the implementations that use', () => {
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
});
