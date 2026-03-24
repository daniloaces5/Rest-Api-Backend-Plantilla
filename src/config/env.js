import dotenv from 'dotenv';
import { z } from 'zod';

const result = dotenv.config();
if (result.error && process.env.NODE_ENV !== 'production') {
  // In production, allow environment to be managed by platform
  throw result.error;
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  APP_NAME: z.string().default('backend'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_ISSUER: z.string().default('backend'),
  JWT_AUDIENCE: z.string().default('backend-users'),

  DATABASE_URL: z.string().min(10),
  DB_POOL_MAX: z.coerce.number().int().positive().default(10),
  DB_POOL_IDLE: z.coerce.number().int().positive().default(10000),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),

  LOG_LEVEL: z.string().default('info')
});

export const env = envSchema.parse(process.env);
