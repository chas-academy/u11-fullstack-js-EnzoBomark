import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';
import { getToken } from '../test-utils/getToken.utils';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('PUT /api/auth/updatecreds', () => {
  describe('given a username, email and password', () => {
    it('should respond with a status 200 code', async () => {
      const res = await request
        .put('/api/auth/updatecreds')
        .auth(await getToken(), { type: 'bearer' })
        .send({
          name: 'R2-D2',
          email: 'testing@gmail.com',
          password: 'test123456',
        });

      // Ensures response status
      expect(res.statusCode).toBe(200);
    });
  });

  describe('No token provided', () => {
    it('should respond with a status code of 403', async () => {
      const res = await request.put('/api/auth/updatecreds').send({
        name: 'R2-D2',
        email: 'testing@gmail.com',
        password: 'test123456',
      });

      expect(res.statusCode).toBe(403);
    });
  });
});
