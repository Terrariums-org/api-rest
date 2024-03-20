import { Module } from '@nestjs/common';
import { TokenService } from 'src/auth/aplication/services/token.service';

@Module({
  imports: [TokenService],
  providers: [TokenService],
})
export class GuardsModule {}
