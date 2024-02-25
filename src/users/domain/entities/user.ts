import { UserProfileInterface } from './user_profile';
import { TerrariumsInterface } from 'src/terrariums/domain/entities';

export interface UserInterface {
  id: number;
  email: string;
  username: string;
  passwordUser: string;
  userProfile: UserProfileInterface;
  terrariums: TerrariumsInterface[];
}
