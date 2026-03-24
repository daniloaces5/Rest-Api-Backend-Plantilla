import { AppError } from '../utils/appError.js';
import { logger } from '../utils/logger.js';

export const notFound = (req, _res, next) => {
  next(new AppError(`Not found: ${req.originalUrl}`, 404));
};

export const errorHandler = (err, _req, res, _next) => {
  const isOperational = err.isOperational || err instanceof AppError;
  const statusCode = err.statusCode || 500;

  if (!isOperational) {
    logger.error({ err }, 'Unexpected error');
  }

  const payload = {
    error: {
      message: isOperational ? err.message : 'Internal server error',
      details: isOperational ? err.details : undefined
    }
  };

  res.status(statusCode).json(payload);
};
