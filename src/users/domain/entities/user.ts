import { UserProfileInterface } from './user_profile';
import { TerrariumsInterface } from '../../../terrariums/domain/entities';

export interface UserInterface {
  readonly id: number;
  readonly email: string;
  readonly username: string;
  readonly passwordUser: string;
  readonly userProfile: UserProfileInterface;
  readonly terrariums: TerrariumsInterface[];
}
