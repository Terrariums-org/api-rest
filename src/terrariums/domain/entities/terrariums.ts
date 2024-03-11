import { TerrariumsProfileInterface } from './terrariums_profile';
import { UserInterface } from 'src/users/domain/entities';

export interface TerrariumsInterface {
  id: number;
  name: string;
  id_user: UserInterface;
  terrariumProfile: TerrariumsProfileInterface;
}
