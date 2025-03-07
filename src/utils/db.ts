/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config')[env];

const { username, password, database, host } = config;

interface SequelizeOptions {
  host: string | undefined;
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
}

const settings: SequelizeOptions = {
  database,
  username,
  password,
  host,
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
