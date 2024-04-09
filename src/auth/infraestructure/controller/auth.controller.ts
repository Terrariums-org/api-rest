import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from '../../aplication/services/auth.service';
import { CreateLoginDTO } from '../../domain/dto/create-login.dto';
import { CreateUserDto } from '../../../users/domain/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(@Body() createLogin: CreateLoginDTO) {
    return this.authService.loginService(createLogin);
  }
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUser: CreateUserDto) {
    return this.authService.registerService(createUser);
  }
}
