import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

ConfigModule.forRoot();
export const typeOrmConfig = (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      join(__dirname, '..', '**', '*.entity.{ts,js}'),
      join(__dirname, '..', '**', 'entities/*.{ts,js}'),
    ],
    migrations: [join(__dirname, '..', '**', '/migrations/*.{ts,js}')],
    migrationsTableName: 'migration_table',
    synchronize: false,
    poolSize: Number(process.env.CONNECTION_POOLSIZE),
    connectTimeoutMS: 30000,
  };
};
