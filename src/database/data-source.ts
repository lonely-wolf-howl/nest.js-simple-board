import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENVIRONMENT}` });

export default new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
