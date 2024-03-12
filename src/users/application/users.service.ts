import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../domain/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infraestructure/ports/mysql/user.entity';
import { Repository } from 'typeorm';
import { UserServiceRepository } from '../domain/repositories/userServiceRepository';
import { UserInterface } from '../domain/entities';
import { UserProfile } from '../infraestructure/ports/mysql/user_profile.entity';
import { CustomError } from 'src/shared/utils/Custom_error';

@Injectable()
export class UsersService implements UserServiceRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async loginService(user: UpdateUserDto): Promise<UserInterface> {
    try {
      let loginUser = await this.userRepository.findOne({
        where: user,
        relations: {
          userProfile: true,
          terrariums: true,
        },
      });
      console.log(loginUser)
      if (loginUser) {
        return loginUser;
      } else {
        throw new CustomError('NOT_FOUND', 'Credenciales Invalidas');
      } 
    } catch (err) {
      CustomError.createCustomError(err.message);
    }
  }

  async updateService(user: UpdateUserDto): Promise<UserInterface> {
    try {
      if (!user.terrariums) {
        user.terrariums = [];
      }
      return await this.userRepository.save(user);
    } catch (err) {
      CustomError.createCustomError(err.message);
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
