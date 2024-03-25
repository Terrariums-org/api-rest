import { Test } from '@nestjs/testing';
import { UsersController } from '../infraestructure/controllers/users.controller';
import { UsersService } from '../application/users.service';
import { HashedPasswordService } from '../../auth/aplication/services/hashedPassword.service';
import { BcryptRepositoryImp } from '../../auth/infraestructure/ports/BcryptRepositoryImp.port';
import { TokenService } from '../../auth/aplication/services/token.service';
import { TokenRepositoryImp } from '../../auth/infraestructure/ports/TokenRepositoryImp.port';
import { mockUsersService } from './mocks/userService.mock';
import { userStub } from './stub/user.stub';
import { UserInterface } from '../domain/entities';

describe('Users Controller', () => {
  let userToExperiment: UserInterface;
  let userController: UsersController;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        HashedPasswordService,
        BcryptRepositoryImp,
        TokenService,
        TokenRepositoryImp,
      ],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();
    userController = moduleRef.get<UsersController>(UsersController);
    userToExperiment = userStub()[0];
  });
  it('Users Controller Should be defined', () => {
    expect(userController).toBeDefined();
  });
  it('Should update a user', () => {
    expect(userController.updateUser(userToExperiment)).toEqual(
      userToExperiment,
    );
    expect(mockUsersService.updateService).toHaveBeenCalledWith(
      userToExperiment,
    );
    expect(mockUsersService.updateService).toHaveBeenCalledTimes(1);
  });
  it('should delete a user', () => {
    expect(userController.remove(1)).toEqual('user with id 1 deleted ');
    expect(mockUsersService.removeService).toHaveBeenCalledWith(1);
    expect(mockUsersService.updateService).toHaveBeenCalledTimes(1);
  });
});
