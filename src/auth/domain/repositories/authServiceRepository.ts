import { CreateUserDto } from '../../../users/domain/dto';
import { LoginInterface, TokenResponse } from '../entities';

export interface AuthServiceRepository {
  loginService(user: LoginInterface): Promise<TokenResponse>;
  registerService(user: CreateUserDto): Promise<TokenResponse>;
}
