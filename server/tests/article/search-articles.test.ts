import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';
import { getToken } from '../test-utils/getToken.utils';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('POST /api/article/search', () => {
  describe('given a query', () => {
    test('should respond with a status 200 code and success message', async () => {
      const res = await request.post(`/api/article/search`).send({ query: '', page: 1 });

      // Ensures response status
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });
  });
});
