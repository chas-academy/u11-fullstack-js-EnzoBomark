import supertest from 'supertest';

import { app, setupDB } from '../test-setup';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('POST /api/user/login', () => {
  describe('given an email and password', () => {
    it('Should return an accessToken', async () => {
      const res = await request.post('/api/user/login').send({
        email: 'testing1@gmail.com',
        password: 'test12345',
      });

      // Ensures response status
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });
  });

  describe('Bad creds', () => {
    it('should respond with a status code of 400', async () => {
      const res = await request.post('/api/user/login').send({
        email: 'gmail.com',
        password: 'test12345',
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBeUndefined();
    });
  });
});
