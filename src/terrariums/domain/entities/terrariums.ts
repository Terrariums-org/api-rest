import { TerrariumsProfileInterface } from './terrariums_profile';
import { UserInterface } from 'src/users/domain/entities';

export interface TerrariumsInterface {
  id: number;
  name: string;
  user: UserInterface;
  terrariumProfile: TerrariumsProfileInterface;
}
