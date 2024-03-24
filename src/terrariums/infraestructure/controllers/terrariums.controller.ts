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
import { AuthGuard } from '../../../shared/config/application/guards/auth.guard';
import { TerrariumsService } from '../../application/services/terrariums.service';
import { CreateTerrariumDto, UpdateTerrariumDto } from '../../domain/dto';

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
  findAll() {
    return this.terrariumsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.terrariumsService.findOne(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.terrariumsService.remove(+id);
  }
}
