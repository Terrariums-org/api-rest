import { CreateUserDto } from "src/users/domain/dto";
import { LoginInterface } from "../entities/login.entity";

export interface AuthServiceRepository {
    loginService(user: LoginInterface): Promise<string>;
    registerService(user : CreateUserDto) : Promise<string>;
}