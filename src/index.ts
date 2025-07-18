import express from 'express';
import cors from 'cors';
import { sequelize, DbManager } from './config/database.js';
import { config } from 'dotenv';
import apiRouter from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);
app.use(errorHandler);

(async () => {
  try {
    const dbManager = DbManager.getInstance();
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    dbManager.initModels();
    dbManager.defineRelations();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();

export default app;
