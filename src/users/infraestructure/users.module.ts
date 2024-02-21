import { Module } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './ports/mysql/user_profile.entity';
import { User } from './ports/mysql/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
