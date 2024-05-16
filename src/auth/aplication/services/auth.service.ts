import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLoginDTO } from '../../domain/dto/create-login.dto';
import { AuthServiceRepository } from '../../domain/repositories/authServiceRepository';
import { CustomError } from '../../../shared/config/application/utils/Custom_error';
import { User } from '../../../users/infraestructure/ports/mysql/user.entity';
import { Repository } from 'typeorm';
import { TokenService } from './token.service';
import { CreateUserDto } from '../../../users/domain/dto';
import { HashedPasswordService } from './hashedPassword.service';
import { TokenResponse } from '../../domain/entities';

@Injectable()
export class AuthService implements AuthServiceRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(TokenService) private readonly tokenService: TokenService,
    @Inject(HashedPasswordService)
    private readonly hashedPasswordService: HashedPasswordService,
  ) {}
  async loginService(user: CreateLoginDTO): Promise<TokenResponse> {
    try {
      const loginUser = await this.userRepository.findOne({
        where: {
          email: user?.email,
        },
      });
      if (loginUser) {
        const { username, id, passwordUser: passwordOriginal } = loginUser;
        const { passwordUser: passwordReq } = user;
        const isValid = await this.hashedPasswordService.comparePassword(
          passwordOriginal,
          passwordReq,
        );
        if (!isValid) {
          throw new CustomError('UNAUTHORIZED', 'Credenciales invalidas');
        }
        const token = this.tokenService.signToken({ id, username });
        return token;
      } else {
        throw new CustomError('NOT_FOUND', 'Credenciales Invalidas');
      }
    } catch (err) {
      throw CustomError.createCustomError(err.message);
    }
  }
  async registerService(user: CreateUserDto): Promise<TokenResponse> {
    try {
      const existingUserByEmail = await this.userRepository.findOne({
        where: {
          email: user?.email,
        },
      });
      const existingUserByUsername = await this.userRepository.findOne({
        where: {
          username: user?.username,
        },
      });
      if (!existingUserByEmail && !existingUserByUsername) {
        const { passwordUser } = user;
        //encriptar contraseña
        const passwordHashed =
          await this.hashedPasswordService.encodePassword(passwordUser);
        const newUser = {
          ...user,
          passwordUser: passwordHashed,
        };
        const userCreated = await this.userRepository.save(newUser);
        const { id, username } = userCreated;
        const token = await this.tokenService.signToken({ id, username });
        return token;
      } else if (existingUserByEmail) {
        throw new CustomError(
          'CONFLICT',
          `usuario con email: ${user?.email} existente`,
        );
      } else {
        throw new CustomError(
          'CONFLICT',
          `usuario con nombre: ${user?.username} existente`,
        );
      }
    } catch (error) {
      throw CustomError.createCustomError(error.message);
    }
  }
}
