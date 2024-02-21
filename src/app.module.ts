import { Module } from '@nestjs/common';
import { UsersModule } from './users/infraestructure/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '',
      port: 3306,
      username: '',
      password: '',
      database: 'test',
      entities: [__dirname+"/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
