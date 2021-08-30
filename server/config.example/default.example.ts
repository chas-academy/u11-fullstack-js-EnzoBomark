export default {
  PORT: 5000,
  MONGO_URI: 'mongodb://localhost:27017/node_auth',
  SALT_WORK_FACTOR: 10,

  RESET_TOKEN_TTL: '10m',
  ACCESS_TOKEN_TTL: '15m',
  REFRESH_TOKEN_TTL: '1y',
  PRIVATE_KEY: `ADD PRIVATE KEY`,

  EMAIL_SERVICE: 'ADD EMAIL SERVICE',
  EMAIL_USERNAME: 'USERNAME',
  EMAIL_PASSWORD: 'PASSWORD',
  EMAIL_FROM: 'MAIL',

  AWS_BUCKET_NAME: 'NAME',
  AWS_BUCKET_REGION: 'REGION',
  AWS_ACCESS_KEY: 'ACCESS KEY',
  AWS_SECRET_KEY: 'SECRET KEY',
};
