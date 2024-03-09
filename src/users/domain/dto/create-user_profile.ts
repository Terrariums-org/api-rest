import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserProfile {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  last_name: string;
  constructor(name: string, last_name: string) {
    this.name = name;
    this.last_name = last_name;
  }
}
