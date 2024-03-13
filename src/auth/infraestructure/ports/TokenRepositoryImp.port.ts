import { configService } from 'src/shared/config/domain/configEnv';
import { TokenPortRepository } from 'src/auth/domain/repositories/tokenPortRepository';
import { sign, decode } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRepositoryImp implements TokenPortRepository {
  private readonly secretWord: string = configService.get('JWT_SECRET');
  async generateToken(userPayload: any): Promise<string> {
    try {
      const token = await sign(userPayload, this.secretWord, {
        expiresIn: '1h',
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
  async decodeToken(token: string): Promise<any> {
    try {
      const decodePayload = await decode(token);
      return decodePayload;
    } catch (error) {
      throw new Error(error);
    }
  }
}
