import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import escapeRoomRoutes from './routes/escapeRoom';
import { errorHandler } from './middleware/errorHandler';
import logger from './config/logger';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// התחברות ל-DB רק אם לא בסביבת טסט
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use('/api/auth', authRoutes);
app.use('/api/escaperooms', escapeRoomRoutes);
app.use(errorHandler);

// הפעלת השרת רק אם לא בסביבת טסט
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}

export { app };