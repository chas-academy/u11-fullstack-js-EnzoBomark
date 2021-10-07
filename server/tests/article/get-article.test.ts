import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';
import { getArticle } from '../test-utils/getArticle.utils';
import { getToken } from '../test-utils/getToken.utils';

const request = supertest(app);

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
