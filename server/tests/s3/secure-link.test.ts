import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';
import { getToken } from '../test-utils/getToken.utils';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('GET /api/secure/s3', () => {
  test('should respond with a url and status 200', async () => {
    const res = await request.get('/api/secure/s3').auth(await getToken(), { type: 'bearer' });

    // Ensures response status
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeDefined();
  });
});
