export interface TokenServiceRepository {
    signToken(payload : any, expiresIn : string) : Promise<string>;
    decodeToken(token : string) : Promise<any>;
}