import { Inject, Injectable } from '@nestjs/common';
import { PayloadInterface } from 'src/auth/domain/entities/payload.entity';
import { TokenServiceRepository } from 'src/auth/domain/repositories/tokenServiceRepository';
import { TokenRepositoryImp } from 'src/auth/infraestructure/ports/TokenRepositoryImp.port';

@Injectable()
export class TokenService implements TokenServiceRepository {
  constructor(
    @Inject(TokenRepositoryImp)
    private readonly tokenRepositoryImp: TokenRepositoryImp,
  ) {}
  async signToken(payload: PayloadInterface): Promise<string> {
    try {
      const token = await this.tokenRepositoryImp.generateToken(payload);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
  async decodeToken(token: string): Promise<PayloadInterface> {
    try {
      const payload = await this.tokenRepositoryImp.decodeToken(token);
      return payload;
    } catch (error) {
      throw new Error(error);
    }
  }
}
