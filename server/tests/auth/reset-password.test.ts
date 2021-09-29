import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';
import { getToken } from '../test-utils/getToken.utils';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('PUT /api/auth/resetpassword/:resetToken', () => {
  describe('given a bad token', () => {
    it('should respond with a 400', async () => {
      const res = await request
        .put(`/api/auth/resetpassword/badToken`)
        .send({ password: 'newpassword123' });

      // Ensures response status
      expect(res.statusCode).toBe(400);
    });
  });
});
