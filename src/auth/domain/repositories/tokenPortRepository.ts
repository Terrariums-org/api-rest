import { PayloadInterface } from '../entities/payload.entity';

export interface TokenPortRepository {
  generateToken(
    userPayload: PayloadInterface,
  ): Promise<string>;
  decodeToken(token: string): Promise<PayloadInterface>;
}
