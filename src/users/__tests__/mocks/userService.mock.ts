import { UpdateUserDto } from '../../domain/dto';

export const mockUsersService = {
  updateService: jest.fn().mockImplementation((userReq: UpdateUserDto) => {
    return userReq;
  }),
  removeService: jest.fn().mockImplementation((id: number) => {
    return `user with id ${id} deleted `;
  }),
};
