import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit'; // ייבוא ה-Rate Limiter
import { connectDB } from './config/db'; // וודאי שהקובץ קיים בנתיב הזה
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';
import logger from './config/logger';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
dotenv.config();
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 1. הגדרת Rate Limiter (מגביל ל-100 בקשות בכל 15 דקות לכל IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 דקות
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(cors());
app.use(express.json());
app.use(limiter); // החלת ההגנה על כל הנתיבים

// התחברות ל-DB
if (process.env.NODE_ENV !== 'test') {
  connectDB().catch((err) => logger.error('DB connection failed:', err));
}

app.use('/api/auth', authRoutes);
app.use(errorHandler);

// הפעלת השרת
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}

export { app };
