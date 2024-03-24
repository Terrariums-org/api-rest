import { Global, Module } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './ports/mysql/user_profile.entity';
import { User } from './ports/mysql/user.entity';
import { HashedPasswordService } from '../../auth/aplication/services/hashedPassword.service';
import { BcryptRepositoryImp } from '../../auth/infraestructure/ports/BcryptRepositoryImp.port';
import { TokenService } from '../../auth/aplication/services/token.service';
import { TokenRepositoryImp } from '../../auth/infraestructure/ports/TokenRepositoryImp.port';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    HashedPasswordService,
    BcryptRepositoryImp,
    TokenService,
    TokenRepositoryImp,
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
