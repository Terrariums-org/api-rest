import { TerrariumsProfileInterface } from './terrariums_profile';
import { UpdateUserDto } from 'src/users/domain/dto';

export interface TerrariumsInterface {
  id: number;
  name: string;
  user?: UpdateUserDto;
  terrariumProfile: TerrariumsProfileInterface;
}
