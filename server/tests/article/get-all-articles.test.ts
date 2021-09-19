import { app } from '../test-setup';
import supertest from 'supertest';
import { getToken } from '../test-utils/getToken.utils';
const request = supertest(app);

import { MODEL } from '../../model';
import { setupDB } from '../test-setup';

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
