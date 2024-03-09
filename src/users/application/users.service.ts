import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../domain/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infraestructure/ports/mysql/user.entity';
import { Repository } from 'typeorm';
import { UserServiceRepository } from '../domain/repositories/userServiceRepository';
import { UserInterface } from '../domain/entities';

@Injectable()
export class UsersService implements UserServiceRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  
  async loginService(user: UpdateUserDto): Promise<String> {
    try {
      throw new Error('Method not implemented.');
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateService(user: UpdateUserDto): Promise<UserInterface> {
    try {
      return await this.userRepository.save(user);
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeService(id: number): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.raw)
        throw new HttpException('User was not affected', HttpStatus.NOT_FOUND);
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
