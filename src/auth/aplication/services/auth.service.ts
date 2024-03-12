import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLoginDTO } from 'src/auth/domain/dto/create-login.dto';
import { AuthServiceRepository } from 'src/auth/domain/repositories/authServiceRepository';
import { CustomError } from 'src/shared/utils/Custom_error';
import { User } from 'src/users/infraestructure/ports/mysql/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService implements AuthServiceRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async loginService(user: CreateLoginDTO): Promise<string> {
    try {
      const loginUser = await this.userRepository.findOne({
        where: {
          email: user?.email,
          passwordUser: user?.passwordUser,
        },
      });
      if (loginUser) {
        const { username, passwordUser } = loginUser;
        return '';
      } else {
        throw new CustomError('NOT_FOUND', 'Credenciales Invalidas');
      }
    } catch (err) {
      throw CustomError.createCustomError(err.message);
    }
  }
}
