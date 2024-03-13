import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/aplication/services/auth.service';
import { CreateLoginDTO } from 'src/auth/domain/dto/create-login.dto';
import { CreateUserDto } from 'src/users/domain/dto';

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
