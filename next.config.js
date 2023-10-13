const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withPWA = require('next-pwa');

const enviroments = {
  DEV: {
    api: 'https://apimentorbetsddev.azurewebsites.net/',
    clientIdAuth0: 'KJ7rRDDQdtvDUcejl7WsJbk7iyzUHTUY',
    domainAuth0: 'dev-t8rv4t8rt4dxhpiz.us.auth0.com',
  },
  QA: {
    api: 'https://apimentorbetsqa.azurewebsites.net/',
    clientIdAuth0: 'LLi5kTDd8SZjGub33U9PbmezLZG1b465',
    domainAuth0: 'dev-fgi0lgxm.us.auth0.com',
  },
  PROD: {
    api: 'https://apimentorbets.azurewebsites.net/',
    clientIdAuth0: 'ja0IqflOTnaQL9B3sVti4WHQieJqtIgn',
    domainAuth0: 'dev-aj-8ik6h.us.auth0.com',
  },
};

const getEnviroment = () => enviroments.DEV;

const {
  API_ENDPOINT = getEnviroment().api,
  DEPLOYMENT_ENV = 'local',
  IDP_DOMAIN = '',
  USER_POOL_ID = '',
  USER_POOL_CLIENT_ID = '',
  SITE_DOMAIN = 'localhost',
  SITE_URL = 'http://localhost:3000',
  DOMAIN_AUTH = getEnviroment().domainAuth0,
  CLIENT_ID_AUTH = getEnviroment().clientIdAuth0,
} = process.env;

const env = {
  API_ENDPOINT,
  IDP_DOMAIN,
  USER_POOL_ID,
  USER_POOL_CLIENT_ID,
  ALLOWED_URL: SITE_URL,
  AUTH_COOKIE_DOMAIN: SITE_DOMAIN,
  DOMAIN_AUTH: DOMAIN_AUTH,
  CLIENT_ID_AUTH: CLIENT_ID_AUTH,
};

console.info('Deployment Environment:', DEPLOYMENT_ENV);
module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          register: true,
          skipWaiting: true,
          disable: process.env.NODE_ENV === 'test',
        },
      },
    ],
    [withImages],
  ],
  {
    env,
    experimental: {modern: true},
    future: {webpack5: true},
  },
);
