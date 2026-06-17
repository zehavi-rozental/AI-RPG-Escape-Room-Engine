import mongoose from 'mongoose';
import logger from './logger';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      logger.error('MONGO_URI is not set. Set MONGO_URI in your environment or .env file.');
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${(error as Error).message}`);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};
