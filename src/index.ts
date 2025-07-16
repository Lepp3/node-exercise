import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
