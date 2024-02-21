import { UserProfile } from "src/users/infraestructure/ports/mysql/user_profile.entity";

export interface UserInterface {
  id : number;
  email: string;
  username: string;
  passwordUser: string;
  id_user_profile: UserProfile;
}
