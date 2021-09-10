import { app } from '../test-setup';
import supertest from 'supertest';
import { getToken } from '../test-utils/getToken.utils';
import { getArticle } from '../test-utils/getArticle.utils';
const request = supertest(app);

import { MODEL } from '../../model';
import { setupDB } from '../test-setup';

setupDB('endpoint-testing', true);

describe('GET /api/article:articleId', () => {
  describe('given a articleId', () => {
    test('should respond with a 200 and success message', async () => {
      const res = await request.get(`/api/article/${await getArticle()}`);

      // Ensures response status
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });
  });
});
