import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';
import { getToken } from '../test-utils/getToken.utils';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('GET /api/auth/user', () => {
  describe('given a accessToken', () => {
    it('should respond with a user', async () => {
      const res = await request.get('/api/auth/user').auth(await getToken(), { type: 'bearer' });

      // Ensures response status
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });
  });
});
