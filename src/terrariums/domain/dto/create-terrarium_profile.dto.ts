import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateTerrariumProfileDto {
  @IsString()
  @ApiProperty()
  max_temp: string;

  @IsInt()
  @ApiProperty()
  min_temp: string;

  @IsInt()
  @ApiProperty()
  max_humidity: string;

  @IsInt()
  @ApiProperty()
  min_humidity: string;

  @IsInt()
  @ApiProperty()
  max_uv: string;

  @IsInt()
  @ApiProperty()
  min_uv: string;
}
