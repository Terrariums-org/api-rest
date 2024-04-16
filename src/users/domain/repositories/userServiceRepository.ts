import { UpdateUserDto } from '../dto';
import { UserInterface } from '../entities';

export interface UserServiceRepository {
  updateService(user: UpdateUserDto): Promise<UserInterface>;
  removeService(id: number): Promise<void>;
}
