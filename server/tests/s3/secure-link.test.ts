import { app } from '../test-setup';
import supertest from 'supertest';
import { getToken } from '../test-utils/getToken.utils';
const request = supertest(app);

import { MODEL } from '../../model';
import { setupDB } from '../test-setup';

setupDB('endpoint-testing', true);

describe('GET /api/secure/s3', () => {
  test('should respond with a url and status 200', async () => {
    const res = await request
      .get('/api/secure/s3')
      .auth(await getToken(), { type: 'bearer' });

    // Ensures response status
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toBeDefined();
  });
});
