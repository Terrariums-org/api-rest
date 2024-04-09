import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/config/application/guards/auth.guard';
import { TerrariumsService } from 'src/terrariums/application/services/terrariums.service';
import { CreateTerrariumDto } from 'src/terrariums/domain/dto';
import { UpdateTerrariumDto } from 'src/terrariums/domain/dto';
import { CreateUserDto } from 'src/users/domain/dto';

@Controller('terrariums')
@UseGuards(AuthGuard)
export class TerrariumsController {
  constructor(
    @Inject(TerrariumsService)
    private readonly terrariumsService: TerrariumsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTerrariumDto: CreateTerrariumDto) {
    return this.terrariumsService.create(createTerrariumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllByUser(@Body() user: CreateUserDto) {
    return this.terrariumsService.findAllByUser(user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findOne(@Body() id: UpdateTerrariumDto) {
    return this.terrariumsService.findOneById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.terrariumsService.remove(+id);
  }
}
