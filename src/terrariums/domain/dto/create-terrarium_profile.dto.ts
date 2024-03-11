import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateTerrariumProfileDto {
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
