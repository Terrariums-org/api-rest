import { configService } from '../../../config/domain/configEnv';
import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('HOST'),
  port: configService.get('PORT'),
  username: configService.get('USER'),
  password: configService.get('PASSWORD'),
  database: configService.get('DATABASE'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export const dataConnection = new DataSource(connectionOptions);
