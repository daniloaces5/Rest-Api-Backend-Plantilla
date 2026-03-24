import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import compression from 'compression';
import { appConfig } from '../config/app.js';

export const securityMiddleware = [
  helmet(),
  cors({
    origin: appConfig.corsOrigin.split(',').map((o) => o.trim()),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }),
  hpp(),
  rateLimit({
    windowMs: appConfig.rateLimit.windowMs,
    max: appConfig.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false
  }),
  compression()
];
