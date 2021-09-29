import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';
import { getToken } from '../test-utils/getToken.utils';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('GET /api/auth/sessions', () => {
  describe('given an accessToken', () => {
    it('should respond with a 200', async () => {
      const res = await request
        .get('/api/auth/sessions')
        .auth(await getToken(), { type: 'bearer' });

      // Ensures response status
      expect(res.statusCode).toBe(200);
    });
  });
});
