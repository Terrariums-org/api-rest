import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../domain/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infraestructure/ports/mysql/user.entity';
import { Repository } from 'typeorm';
import { UserServiceRepository } from '../domain/repositories/userServiceRepository';
import { UserInterface } from '../domain/entities';
import { UserProfile } from '../infraestructure/ports/mysql/user_profile.entity';
import { CustomError } from '../../shared/config/application/utils/';
import { HashedPasswordService } from '../../auth/aplication/services/hashedPassword.service';

@Injectable()
export class UsersService implements UserServiceRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    @Inject(HashedPasswordService)
    private readonly hashedPasswordService: HashedPasswordService,
  ) {}

  async updateService(user: UpdateUserDto): Promise<UserInterface> {
    try {
      if (!user.terrariums) {
        user.terrariums = [];
      }
      const { passwordUser: passwordReq } = user;
      const passwordHash =
        await this.hashedPasswordService.encodePassword(passwordReq);
      const newUser = {
        ...user,
        passwordUser: passwordHash,
      };
      return await this.userRepository.save(newUser);
    } catch (err) {
      throw CustomError.createCustomError(err.message);
    }
  }

  async removeService(id: number): Promise<void> {
    try {
      const result =
        (await this.userRepository.delete(id)) &&
        (await this.userProfileRepository.delete(id));
      if (!result.raw) throw new CustomError('NOT_FOUND', 'No affected user');
    } catch (err) {
      CustomError.createCustomError(err.message);
    }
  }
}
