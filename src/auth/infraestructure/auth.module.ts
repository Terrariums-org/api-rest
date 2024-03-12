import { Module } from '@nestjs/common';
import { AuthService } from '../aplication/services/auth.service';
import { AuthController } from '../infraestructure/controller/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
