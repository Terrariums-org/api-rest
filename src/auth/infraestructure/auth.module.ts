import { Module } from '@nestjs/common';
import { AuthService } from '../aplication/services/auth.service';
import { AuthController } from '../infraestructure/controller/auth.controller';
import { UsersModule } from 'src/users/infraestructure/users.module';
import { UsersService } from 'src/users/application/users.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
