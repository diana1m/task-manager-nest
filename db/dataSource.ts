import { DataSource } from 'typeorm';
import * as Entities from './entities';
import * as process from 'process';
import 'dotenv/config';
console.log(Object.values(Entities));

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_NAME,
  entities: Object.values(Entities),
  migrations: ['./db/migrations/*.ts'],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!', AppDataSource);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
