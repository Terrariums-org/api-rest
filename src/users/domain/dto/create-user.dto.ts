import { CreateUserProfile } from "./create-user_profile";

export class CreateUserDto {
  username: string;
  password: string;
  userProfile: CreateUserProfile;
}
