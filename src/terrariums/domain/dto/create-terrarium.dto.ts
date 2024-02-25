import { UserInterface } from "src/users/domain/entities";
import { TerrariumsProfileInterface } from "../entities";

export class CreateTerrariumDto {
  name: string;
  id_terrarium_profile: TerrariumsProfileInterface;
  id_user: UserInterface;
}
