import supertest from 'supertest';

import { getArticle } from '../helpers/getArticle.utils';
import { getToken } from '../helpers/getToken.utils';
import { app, setupDB } from '../test-setup';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('PUT /api/article:articleId', () => {
  describe('given a title, tags, image and body', () => {
    test('should respond with a 200 and success message', async () => {
      const res = await request
        .put(`/api/article/${await getArticle()}`)
        .send({
          title: 'new article',
          image: 'fakeimagelink',
          tags: ['test'],
          body: [{ type: 'paragraph', text: 'test' }],
        })
        .auth(await getToken(), { type: 'bearer' });

      // Ensures response status
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });
  });
});
