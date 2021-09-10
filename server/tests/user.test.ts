import request from 'supertest';
import { app } from './index';

const accessToken = { token: '' };
const name = 'jane doe';
const email = 'foo@bar.test';
const password = 'password123';

const registerTest = () => {
  describe('POST /api/auth/register', () => {
    describe('given a username, email and password', () => {
      it('should respond with a status 201 code', async () => {
        const res = await request(app).post('/api/auth/register').send({
          name,
          email,
          password,
        });
        expect(res.statusCode).toBe(201);
      });
    });
  });
};

const loginTest = () => {
  describe('POST /api/auth/login', () => {
    describe('given an email and password', () => {
      test('should respond with a accessToken', async () => {
        const res = await request(app).post('/api/auth/login').send({
          email,
          password,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBeDefined();
        accessToken.token = res.body.accessToken;
      });
    });
  });
};
