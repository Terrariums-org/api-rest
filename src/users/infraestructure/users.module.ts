import { Global, Module } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './ports/mysql/user_profile.entity';
import { User } from './ports/mysql/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
