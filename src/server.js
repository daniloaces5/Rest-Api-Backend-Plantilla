import { createApp } from './app.js';
import { appConfig } from './config/app.js';
import { logger } from './utils/logger.js';

const app = createApp();

app.listen(appConfig.port, () => {
  logger.info({ port: appConfig.port }, `${appConfig.name} running`);
});
