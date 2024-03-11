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
}
