import supertest from 'supertest';

import { getArticle } from '../helpers/getArticle.utils';
import { app, setupDB } from '../test-setup';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('Post /api/article:articleId', () => {
  describe('given a articleId', () => {
    test('should respond with a 200 and success message', async () => {
      const res = await request
        .post(`/api/article/${await getArticle()}`)
        .send({ user: null });

      // Ensures response status
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });
  });
});
