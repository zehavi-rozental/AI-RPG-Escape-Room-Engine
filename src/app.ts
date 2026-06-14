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

// חיבור ל-Database
connectDB();

// הגדרת נתיבי ה-API
app.use('/api/auth', authRoutes);
app.use('/api/escaperooms', escapeRoomRoutes);

// מנגנון טיפול בשגיאות גלובלי (חובה בסוף השרת)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});