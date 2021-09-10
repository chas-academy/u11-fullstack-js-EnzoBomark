import { app } from '../test-setup';
import supertest from 'supertest';
const request = supertest(app);

export const getToken = async () => {
  const res = await request.post('/api/auth/login').send({
    email: 'testing1@gmail.com',
    password: 'test12345',
  });
  return res.body.accessToken;
};
