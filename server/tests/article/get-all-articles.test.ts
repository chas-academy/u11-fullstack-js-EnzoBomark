import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';
import { getToken } from '../test-utils/getToken.utils';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('GET /api/articles', () => {
  test('should respond with a 200 and success message', async () => {
    const article = await MODEL.Article.findOne({ title: 'article one' });
    const res = await request.get(`/api/articles`);

    // Ensures response status
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeDefined();
  });
});
