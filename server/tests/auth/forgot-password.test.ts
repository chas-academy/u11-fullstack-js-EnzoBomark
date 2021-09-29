import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('POST /api/auth/forgotpassword', () => {
  describe('given an email', () => {
    it('should respond with a 200', async () => {
      const res = await request.post('/api/auth/forgotpassword').send({
        email: 'testing1@gmail.com',
      });

      // Ensures response status
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Non existing email', () => {
    it('should respond with a status code of 400', async () => {
      const res = await request.post('/api/auth/forgotpassword').send({
        email: 'testingmail.com',
      });

      // Ensures response status
      expect(res.statusCode).toBe(400);
    });
  });
});
