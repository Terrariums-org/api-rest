import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerrariumsService } from 'src/terrariums/application/services/terrariums.service';
import { CreateTerrariumDto } from 'src/terrariums/domain/dto';
import { UpdateTerrariumDto } from 'src/terrariums/domain/dto';

@Controller('terrariums')
export class TerrariumsController {
  constructor(private readonly terrariumsService: TerrariumsService) {}

  @Post()
  create(@Body() createTerrariumDto: CreateTerrariumDto) {
    return this.terrariumsService.create(createTerrariumDto);
  }

  @Get()
  findAll() {
    return this.terrariumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.terrariumsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTerrariumDto: UpdateTerrariumDto) {
    return this.terrariumsService.update(+id, updateTerrariumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.terrariumsService.remove(+id);
  }
}
