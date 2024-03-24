import { Test } from '@nestjs/testing';
import { UsersService } from '../application/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../infraestructure/ports/mysql/user.entity';
import { UserProfile } from '../infraestructure/ports/mysql/user_profile.entity';
import { HashedPasswordService } from '../../auth/aplication/services/hashedPassword.service';
import { BcryptRepositoryImp } from '../../auth/infraestructure/ports/BcryptRepositoryImp.port';
import { mockUsersRepository } from './mocks/userRepository.mock';
import { UserInterface } from '../domain/entities';
import { userStub } from './stub/user.stub';

describe('Users service', () => {
  let userToExperiment: UserInterface;
  let userService: UsersService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        HashedPasswordService,
        BcryptRepositoryImp,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(UserProfile),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();
    userService = moduleRef.get<UsersService>(UsersService);
    userToExperiment = userStub()[1];
  });
  it('Users service should be defined', () => {
    expect(userService).toBeDefined();
  });
  it('Should update a user', async () => {
    const updateUser = await userService.updateService(userToExperiment);
    expect(updateUser).not.toBe(userToExperiment);
    expect(mockUsersRepository.save).toHaveBeenCalledTimes(1);
  });
  describe('Delete user service', () => {
    it('Should delete a user', async () => {
      await userService.removeService(1);
      expect(mockUsersRepository.delete).toHaveBeenCalledTimes(2);
    });
    it('Should not delete a user', async () => {
      await expect(userService.removeService(0)).rejects.toThrow('NOT_FOUND');
    });
  });
});
