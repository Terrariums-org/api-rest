import { Module } from '@nestjs/common';
import { UsersModule } from './users/infraestructure/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { connectionOptions } from './shared/connection/domain/entities/connectionOptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    UsersModule,
  ],
})
export class AppModule {}
