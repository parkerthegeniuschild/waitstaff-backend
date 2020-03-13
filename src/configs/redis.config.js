import Redis from 'redis';
import { REDIS, NODE } from '../constants/index';
import Logger from '../logs/winston';

const {
  developmentURI, testURI, productionURI
} = REDIS;
const { env } = NODE;

const connection = (uri) => Redis.createClient(uri);

const client = (env === 'development') ? connection(developmentURI) : (env === 'test')
  ? connection(testURI) : connection(productionURI);

client.on('connect', () => Logger.info('Connection to in-memory datastore successful...'));
client.on('error', () => Logger.error.bind(console, 'connection error:'));

export default client;
