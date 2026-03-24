import express from 'express';
import { securityMiddleware } from './middlewares/security.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler, notFound } from './middlewares/error.js';
import routes from './routes/index.js';

export const createApp = () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(requestLogger);
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(...securityMiddleware);

  app.use(routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
