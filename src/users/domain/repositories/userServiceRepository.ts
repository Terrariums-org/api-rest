import { UpdateUserDto } from '../dto';
import { UserInterface } from '../entities';

export interface UserServiceRepository {
  loginService(user: UpdateUserDto): Promise<UserInterface>;
  updateService(user: UpdateUserDto): Promise<UserInterface>;
  removeService(id: number): Promise<void>;
}
