import pino from 'pino';
import { appConfig } from '../config/app.js';

export const logger = pino({
  level: appConfig.logLevel,
  redact: {
    paths: ['req.headers.authorization', 'password'],
    remove: true
  }
});
