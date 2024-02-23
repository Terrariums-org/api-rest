import { UserProfileInterface } from './user_profile';
import { TerrariumsInterface } from 'src/terrariums/domain/entities';

export interface UserInterface {
  id: number;
  email: string;
  username: string;
  passwordUser: string;
  id_user_profile: UserProfileInterface;
  terrariums: TerrariumsInterface[];
}
