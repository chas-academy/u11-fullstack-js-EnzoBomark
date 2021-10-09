import supertest from 'supertest';

import { app } from '../test-setup';

const request = supertest(app);

export const getToken = async () => {
  const res = await request.post('/api/user/login').send({
    email: 'testing1@gmail.com',
    password: 'test12345',
  });

  return res.body.success.accessToken;
};
