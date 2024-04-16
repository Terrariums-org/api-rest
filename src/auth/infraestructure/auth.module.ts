import { Global, Module } from '@nestjs/common';
import { AuthService } from '../aplication/services/auth.service';
import { AuthController } from '../infraestructure/controller/auth.controller';
import { UsersModule } from '../../users/infraestructure/users.module';
import { TokenService } from '../aplication/services/token.service';
import { TokenRepositoryImp } from './ports/TokenRepositoryImp.port';
import { BcryptRepositoryImp } from './ports/BcryptRepositoryImp.port';
import { HashedPasswordService } from '../aplication/services/hashedPassword.service';

@Global()
@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    //application injection
    AuthService,
    TokenService,
    HashedPasswordService,
    //infraestructure injection
    TokenRepositoryImp,
    BcryptRepositoryImp,
  ],
})
export class AuthModule {}
