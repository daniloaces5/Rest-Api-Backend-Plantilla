import pg from 'pg';
import { appConfig } from '../config/app.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: appConfig.db.url,
  max: appConfig.db.max,
  idleTimeoutMillis: appConfig.db.idleTimeoutMillis,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('Unexpected PG client error', err);
});
