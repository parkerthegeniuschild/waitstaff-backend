import { config } from 'dotenv';

config();

const {
  NODE_ENV, PORT,
  MONGODB_DEVELOPMENT_URI, MONGODB_TEST_URI, MONGODB_PRODUCTION_URI,
  COOKIE_SECRET, REDIS_DEVELOPMENT_URL, REDIS_TEST_URL, REDIS_PRODUCTION_URL,
} = process.env;

export const NODE = {
  env: NODE_ENV,
  port: PORT || 5000,
};

export const MONGODB = {
  developmentURI: MONGODB_DEVELOPMENT_URI,
  testURI: MONGODB_TEST_URI,
  productionURI: MONGODB_PRODUCTION_URI,
};

export const REDIS = {
  developmentURI: REDIS_DEVELOPMENT_URL,
  testURI: REDIS_TEST_URL,
  productionURI: REDIS_PRODUCTION_URL,
};

export const COOKIE = {
  secretKey: COOKIE_SECRET,
};


export const ROUTES = {
  home: '/',
  apiDocs: '/api-docs',
  newCampaign: '/campaigns',
  getAllCampaigns: '/campaigns',
  modifyCampaign: '/campaigns/:id',
  discounts: '/discounts',
};

export const MESSAGES = {
  tooManyRequests: 'You have made too many requests. Please try again later.'
};
