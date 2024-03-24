import { Test } from '@nestjs/testing';
import { UsersService } from '../application/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../infraestructure/ports/mysql/user.entity';
import { UserProfile } from '../infraestructure/ports/mysql/user_profile.entity';
import { HashedPasswordService } from '../../auth/aplication/services/hashedPassword.service';
import { BcryptRepositoryImp } from '../../auth/infraestructure/ports/BcryptRepositoryImp.port';

describe('Users service', () => {
  let userService: UsersService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        HashedPasswordService,
        BcryptRepositoryImp,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserProfile),
          useValue: {},
        },
      ],
    }).compile();
    userService = moduleRef.get<UsersService>(UsersService);
  });
  it('Users service should be defined', () => {
    expect(userService).toBeDefined();
  });
});
