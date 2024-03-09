import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserProfile {
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  last_name: string;
}
