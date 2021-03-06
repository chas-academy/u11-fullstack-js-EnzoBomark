import supertest from 'supertest';

import { getToken } from '../helpers/getToken.utils';
import { app, setupDB } from '../test-setup';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('Delete /api/user/delete', () => {
  describe('given a accessToken', () => {
    it('should respond with a 200', async () => {
      const res = await request
        .delete(`/api/user/delete`)
        .auth(await getToken(), { type: 'bearer' });

      // Ensures response status
      expect(res.statusCode).toBe(200);
    });
  });
});
