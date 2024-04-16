import { Module } from '@nestjs/common';
import { TokenService } from '../../../auth/aplication/services/token.service';

@Module({
  imports: [TokenService],
  providers: [TokenService],
})
export class GuardsModule {}
