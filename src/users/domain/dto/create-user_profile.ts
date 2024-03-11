import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { User } from 'src/users/infraestructure/ports/mysql/user.entity';

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
