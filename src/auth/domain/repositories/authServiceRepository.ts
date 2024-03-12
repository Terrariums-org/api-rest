import { LoginInterface } from "../entities/login.entity";

export interface AuthServiceRepository {
    loginService(user: LoginInterface): Promise<string>;
}