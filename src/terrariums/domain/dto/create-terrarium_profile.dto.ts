import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateTerrariumProfileDto {
  @IsInt()
  @ApiProperty()
  max_temp: number;

  @IsInt()
  @ApiProperty()
  min_temp: number;

  @IsInt()
  @ApiProperty()
  max_humidity: number;

  @IsInt()
  @ApiProperty()
  min_humidity: number;

  @IsInt()
  @ApiProperty()
  max_uv: number;

  @IsInt()
  @ApiProperty()
  min_uv: number;
}
