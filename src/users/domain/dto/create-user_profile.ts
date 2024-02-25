import { IsString } from 'class-validator';

export class CreateUserProfile {
  @IsString()
  name: string;
  @IsString()
  last_name: string;
}
