import { Module } from '@nestjs/common';
import { UsersModule } from './users/infraestructure/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './shared/config/domain/configEnv';
import { TerrariumsModule } from './terrariums/terrariums.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.dev.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configService.get('HOST'),
      port: configService.get('PORT'),
      username: configService.get('USERDB'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    TerrariumsModule,
  ],
})
export class AppModule {}
