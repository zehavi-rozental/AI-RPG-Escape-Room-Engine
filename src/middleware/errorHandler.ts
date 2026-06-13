import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  logger.error(err.stack || err.message);
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};