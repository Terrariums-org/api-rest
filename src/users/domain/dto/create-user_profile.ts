import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserProfile {
  @IsInt()
  @IsOptional()
  @ApiProperty()
    id?: number;

  @IsString()
  @IsNotEmpty()
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
