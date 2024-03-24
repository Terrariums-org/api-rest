import { TerrariumsProfileInterface } from './terrariums_profile';
import { UserInterface } from '../../../users/domain/entities';

export interface TerrariumsInterface {
  id: number;
  name: string;
  user?: UserInterface;
  terrariumProfile: TerrariumsProfileInterface;
}
