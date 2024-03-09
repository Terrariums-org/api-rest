import { UserInterface } from 'src/users/domain/entities';
import { TerrariumsProfileInterface } from '../entities';
import { IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';

export class CreateTerrariumDto {
  @IsString()
  name: string;
  @IsNotEmptyObject()
  @ValidateNested()
  id_terrarium_profile: TerrariumsProfileInterface;
  @IsNotEmptyObject()
  @ValidateNested()
  id_user: UserInterface;
}
