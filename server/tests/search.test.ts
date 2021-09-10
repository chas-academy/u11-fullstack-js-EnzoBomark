import request from 'supertest';
import { app } from './index';

const query = 'test';

const searchTest = () => {
  describe('GET /api/search/articles/:query', () => {
    describe('given a query', () => {
      it('should respond with a status 200 code and success message', async () => {
        const res = await request(app).get(`/api/search/articles/${query}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeDefined();
      });
    });
  });
};

//Run tests
searchTest();
