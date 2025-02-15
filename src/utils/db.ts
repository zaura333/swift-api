/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  PROD_DB_USER,
  PROD_DB_PASSWORD,
  PROD_DB_NAME,
  PROD_DB_HOST,
} = process.env;

interface SequelizeOptions {
    host: string | undefined;
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
  }

const settings: SequelizeOptions =
  process.env.NODE_ENV === 'production'
    ? {
        database: PROD_DB_NAME,
        username: PROD_DB_USER,
        password: PROD_DB_PASSWORD,
        host: PROD_DB_HOST,
      }
    : {
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
      };

export const sequelize = new Sequelize(
  settings.database!,
  settings.username!,
  settings.password!,
  {
    host: settings.host!,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production',
    },
  }
);

export async function connect() {
  try {
    sequelize.sync();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
