export interface TokenPortRepository {
  generateToken(userPayload: any, expiresIn: string): Promise<string>;
  decodeToken(token: string): Promise<any>;
}
