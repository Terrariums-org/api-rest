import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/aplication/services/auth.service';
import { CreateLoginDTO } from 'src/auth/domain/dto/create-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(@Body() createLogin: CreateLoginDTO) {
    return this.authService.loginService(createLogin);
  }
}
