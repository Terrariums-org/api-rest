import { Module } from '@nestjs/common';
import { UsersModule } from './users/infraestructure/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

const mySqlConnection: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(mySqlConnection), UsersModule],
})
export class AppModule {}
