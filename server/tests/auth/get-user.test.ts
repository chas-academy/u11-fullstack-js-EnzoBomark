import { app } from '../test-setup';
import supertest from 'supertest';
import { getToken } from '../test-utils/getToken.utils';
const request = supertest(app);

import { MODEL } from '../../model';
import { setupDB } from '../test-setup';

setupDB('endpoint-testing', true);

describe('GET /api/auth/user', () => {
  describe('given a accessToken', () => {
    it('should respond with a user', async () => {
      const res = await request
        .get('/api/auth/user')
        .auth(await getToken(), { type: 'bearer' });

      // Ensures response status
      expect(res.statusCode).toBe(200);
      expect(res.body.user).toBeDefined();
    });
  });
});
