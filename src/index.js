import 'core-js/stable';
import 'regenerator-runtime/runtime';

import childProcess from 'child_process';
import express from 'express';
import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import compression from 'compression';
import Logger from './logs/winston';
import v1Router from './routes';
import { NODE, COOKIE, MESSAGES } from './constants/index';
import configs from './configs/index';

const { redis } = configs;
const { port } = NODE;
const { secretKey } = COOKIE;
const { tooManyRequests } = MESSAGES;

// detect when a hidden process is spawned
const oldSpawn = childProcess.exec;
childProcess.exec = () => {
  Logger.info('spawn called');
  Logger.info(arguments);
  return oldSpawn.apply(this, arguments);
};

const app = express();

// limit API calls to prevent abuse
const apiLimiter = new RateLimit({
  store: new RedisStore({
    client: redis,
  }),
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayMs: 0,
  max: 100,
  message: tooManyRequests,
});

app.use(helmet());
app.set('trust proxy', 1);
app.use(cors());

// let's save some bandwidth here
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(secretKey));

// stream and persist los to a file for future perusal
app.use(morgan(':remote-addr - [:date] :method :url :status - :response-time ms', { stream: Logger.stream }));

app.use(apiLimiter);
app.use('/api/v1', v1Router);


// Error handling
app.use((req, res, next) => {
  const err = new Error('endpoint not found');
  err.status = NOT_FOUND;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  Logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  res.status(err.status || INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: err.message || 'internal server error',
  });
  next();
});

process.send = process.send || (() => {});

app.listen(port, () => {
  Logger.info(`Live on port ${port}`);

  // Gracefully notify the node process that we are now ready to accept connections
  process.send('ready');
});

export default app;
