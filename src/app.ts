import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import escapeRoomRoutes from './routes/escapeRoom';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// חיבור ל-Database
connectDB();

// Middleware להמרת גוף הבקשה ל-JSON
app.use(express.json());

// הגדרת נתיבי ה-API
app.use('/api/auth', authRoutes);
app.use('/api/escaperooms', escapeRoomRoutes);

// מנגנון טיפול בשגיאות גלובלי (חובה בסוף השרת)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});