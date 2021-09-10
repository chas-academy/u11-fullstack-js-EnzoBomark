import { app } from '../test-setup';
import supertest from 'supertest';
import { getToken } from '../test-utils/getToken.utils';
const request = supertest(app);

import { MODEL } from '../../model';
import { setupDB } from '../test-setup';

setupDB('endpoint-testing', true);

describe('POST /api/search/articles', () => {
  describe('given a query', () => {
    test('should respond with a status 200 code and success message', async () => {
      const res = await request
        .post(`/api/search/articles`)
        .send({ query: 'article one' });

      // Ensures response status
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });
  });
});
