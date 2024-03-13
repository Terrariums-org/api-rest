import { configService } from 'src/shared/config/domain/configEnv';
import { TokenPortRepository } from 'src/auth/domain/repositories/tokenPortRepository';
import jwt from 'jsonwebtoken';

export class TokenRepositoryImp implements TokenPortRepository {
  private readonly secretWord: string = configService.get('JWT_SECRET');
  async generateToken(userPayload: any, expiresIn: string): Promise<string> {
    try {
      const token = await jwt.sign(userPayload, this.secretWord, {
        expiresIn,
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
  async decodeToken(token: string): Promise<any> {
    try {
      const decode = jwt.decode(token);
      return decode;
    } catch (error) {
      throw new Error(error);
    }
  }
}
