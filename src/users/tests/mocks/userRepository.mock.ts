import { UpdateUserDto } from '../../domain/dto';
import { userStub } from '../stub/user.stub';

const mockUsers = userStub();

export const mockUsersRepository = {
  save: jest.fn().mockImplementation((userReq: UpdateUserDto) => {
    let newUser: UpdateUserDto;
    mockUsers.forEach((user) => {
      if (user.id === userReq.id) {
        user = {
          id: user.id,
          email: userReq?.email ?? user.email,
          username: userReq?.username ?? user.username,
          passwordUser: userReq?.passwordUser ?? user.passwordUser,
          userProfile: {
            id: user.id,
            name: userReq?.userProfile?.name ?? user.userProfile.name,
            last_name:
              userReq?.userProfile?.last_name ?? user.userProfile.last_name,
          },
          terrariums: [...user.terrariums],
        };
        newUser = user;
      }
    });
    return newUser;
  }),
  delete: jest.fn().mockImplementation((id: number) => {
    let result = { raw: false };
    mockUsers.forEach((user) => {
      if (user.id === id) result = { raw: true };
    });
    return result;
  }),
};
