import supertest from 'supertest';

import { app, setupDB } from '../test-setup';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('PUT /api/user/reset-password/:resetToken', () => {
  describe('given a bad token', () => {
    it('should respond with a 400', async () => {
      const res = await request
        .put(`/api/user/reset-password/badToken`)
        .send({ password: 'newpassword123' });

      // Ensures response status
      expect(res.statusCode).toBe(400);
    });
  });
});
