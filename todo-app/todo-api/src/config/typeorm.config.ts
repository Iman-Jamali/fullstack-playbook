import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TODO_DB_POSTGRES_HOST,
  port: parseInt(process.env.TODO_DB_POSTGRES_PORT),
  database: process.env.TODO_DB_POSTGRES_DATABASE,
  username: process.env.TODO_DB_POSTGRES_USER,
  password: process.env.TODO_DB_POSTGRES_PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
};
