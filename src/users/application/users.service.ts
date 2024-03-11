import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../domain/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infraestructure/ports/mysql/user.entity';
import { Repository } from 'typeorm';
import { UserServiceRepository } from '../domain/repositories/userServiceRepository';
import { UserInterface } from '../domain/entities';
import { UserProfile } from '../infraestructure/ports/mysql/user_profile.entity';
import { Terrariums } from 'src/terrariums/infraestructure/ports/mysql';

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
        where: {
          email: user.email,
          passwordUser: user.passwordUser,
        },
        relations: {
          userProfile: true,
          terrariums: true,
        },
      });

      if (loginUser) {
        return loginUser;
      } else {
        throw new HttpException('Credenciales Invalidas', HttpStatus.NOT_FOUND);
      }
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateService(user: UpdateUserDto): Promise<UserInterface> {
    try {
      let newUser = await this.userRepository.save(user);
      newUser.terrariums = [];
      return this.userRepository.save(newUser);
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeService(id: number): Promise<void> {
    try {
      const result =
        (await this.userRepository.delete(id)) &&
        (await this.userProfileRepository.delete(id));
      if (!result.raw)
        throw new HttpException('No affected user', HttpStatus.NOT_FOUND);
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
