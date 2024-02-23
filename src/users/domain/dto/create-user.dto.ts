import { UserProfile } from "src/users/infraestructure/ports/mysql/user_profile.entity";

export class CreateUserDto {
  username: string;
  password: string;
  name: string;
  lastname: string;
  id_user_profile: UserProfile;
}
