import { PayloadInterface } from '../entities/payload.entity';

export interface TokenServiceRepository {
  signToken(payload: PayloadInterface): Promise<string>;
  decodeToken(token: string): Promise<PayloadInterface>;
}
