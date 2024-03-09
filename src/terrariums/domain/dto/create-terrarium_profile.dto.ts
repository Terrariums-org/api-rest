import { IsString } from "class-validator";

export class CreateTerrariumProfileDto {
  @IsString()
  max_temp: string;
  @IsString()
  min_temp: string;
  @IsString()
  max_humidity: string;
  @IsString()
  min_humidity: string;
  @IsString()
  max_uv: string;
  @IsString()
  min_uv: string;
}
