import {
  Controller,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Inject,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../../application/users.service';
import { UpdateUserDto } from '../../domain/dto';
import { AuthGuard } from '../../../shared/config/application/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Patch()
  @HttpCode(HttpStatus.CREATED)
  updateUser(@Body() updateUser: UpdateUserDto) {
    return this.usersService.updateService(updateUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeService(id);
  }
}
