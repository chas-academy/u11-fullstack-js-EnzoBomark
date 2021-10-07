import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';
import { getToken } from '../test-utils/getToken.utils';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('POST /api/article', () => {
  describe('given a title, tags, image and body', () => {
    test('should respond with a 201 and success message', async () => {
      const res = await request
        .post('/api/article')
        .send({
          title: 'article one',
          image: 'fakeimagelink',
          tags: ['test'],
          body: [{ type: 'paragraph', text: 'test' }],
        })
        .auth(await getToken(), { type: 'bearer' });

      // Ensures response status
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBeDefined();
    });
  });
});
