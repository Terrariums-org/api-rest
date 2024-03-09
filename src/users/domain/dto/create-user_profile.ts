import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserProfile {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  constructor(name: string, last_name: string) {
    this.name = name;
    this.last_name = last_name;
  }
}
