import pinoHttp from 'pino-http';
import { logger } from '../utils/logger.js';

export const requestLogger = pinoHttp({
  logger,
  customSuccessMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`
});
