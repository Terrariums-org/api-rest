import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../application/users.service';
import { UpdateUserDto } from '../../domain/dto';
import { AuthGuard } from 'src/shared/config/application/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUser: UpdateUserDto) {
    return this.usersService.updateService(createUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeService(id);
  }
}
