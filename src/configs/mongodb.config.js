import mongoose from 'mongoose';
import Logger from '../logs/winston';
import { MONGODB, NODE } from '../constants/index';

const { developmentURI, testURI, productionURI } = MONGODB;
const { env } = NODE;

const databaseURL = (env === 'development') ? developmentURI : (env === 'test')
  ? testURI : productionURI;

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', Logger.error.bind(console, 'connection error:'));
db.once('open', () => Logger.info('Connection to database successful...'));

export default db;
