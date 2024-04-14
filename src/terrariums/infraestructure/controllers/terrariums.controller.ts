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
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/config/application/guards/auth.guard';
import { TerrariumsService } from 'src/terrariums/application/services/terrariums.service';
import { CreateTerrariumDto } from 'src/terrariums/domain/dto';

@ApiTags('Terrariums')
@Controller('terrariums')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
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

  @Get('/user/:id')
  @HttpCode(HttpStatus.OK)
  findAllByUser(@Param('id', ParseIntPipe) id : number ) {
    return this.terrariumsService.findAllByUser(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id : number ) {
    return this.terrariumsService.findOneById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.terrariumsService.remove(id);
  }
}
