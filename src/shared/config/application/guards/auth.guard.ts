import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Decorators_KEYS } from '../../domain';
import { Request } from 'express';
import { TokenService } from '../../../../auth/aplication/services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokenService) private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get(
      Decorators_KEYS.PUBLIC,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    let token = req.headers['authorization'];
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid authorization');
    }
    token = token.substring(7);
    const manageToken = await this.tokenService.decodeToken(token);
    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }
    req.idUser = manageToken.id;
    req.username = manageToken.username;
    return true;
  }
}
