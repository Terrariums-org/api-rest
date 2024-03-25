import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateTerrariumProfileDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  id: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  @ApiProperty()
  max_temp: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  @ApiProperty()
  min_temp: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  @ApiProperty()
  max_humidity: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  @ApiProperty()
  min_humidity: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  @ApiProperty()
  max_uv: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  @ApiProperty()
  min_uv: number;
}
