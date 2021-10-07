import supertest from 'supertest';

import { getToken } from '../helpers/getToken.utils';
import { app, setupDB } from '../test-setup';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('PUT /api/auth/update-creds', () => {
  describe('given a username, email and password', () => {
    it('should respond with a status 200 code', async () => {
      const res = await request
        .put('/api/auth/update-creds')
        .auth(await getToken(), { type: 'bearer' })
        .send({
          name: 'R2-D2',
          email: 'testing@gmail.com',
        });

      // Ensures response status
      expect(res.statusCode).toBe(200);
    });
  });

  describe('No token provided', () => {
    it('should respond with a status code of 403', async () => {
      const res = await request.put('/api/auth/update-creds').send({
        name: 'R2-D2',
        email: 'testing@gmail.com',
      });

      expect(res.statusCode).toBe(403);
    });
  });
});
