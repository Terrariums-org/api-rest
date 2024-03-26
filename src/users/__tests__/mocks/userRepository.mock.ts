import { FindOneOptions } from 'typeorm';
import { UpdateUserDto } from '../../domain/dto';
import { userStub } from '../stub/user.stub';
import { User } from '../../infraestructure/ports/mysql/user.entity';
import { UserInterface } from '../../domain/entities';

export const mockUsersRepository = {
  save: jest.fn().mockImplementation((userReq: UpdateUserDto) => {
    let newUser: UpdateUserDto;
    userStub().forEach((user) => {
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
    userStub().forEach((user) => {
      if (user.id === id) result = { raw: true };
    });
    return result;
  }),
  findOne: jest
    .fn()
    .mockImplementation((options: FindOneOptions<User>): UserInterface => {
      const { email } = options.where as {
        email: string;
      };
      return userStub().filter((user) => user.email === email)[0] ?? null;
    }),
};
