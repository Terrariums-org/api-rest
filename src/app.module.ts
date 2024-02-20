import { Module } from '@nestjs/common';
import { UsersModule } from './users/infraestructure/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
