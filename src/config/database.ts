import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import pg from 'pg';

config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
  }
);
