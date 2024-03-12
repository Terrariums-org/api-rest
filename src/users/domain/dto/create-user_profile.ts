import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateUserProfile {
  @IsInt()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  last_name: string;
  constructor(name: string, last_name: string) {
    this.name = name;
    this.last_name = last_name;
  }
}
