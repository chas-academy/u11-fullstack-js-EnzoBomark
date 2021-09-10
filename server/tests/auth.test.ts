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

    describe('Bad creds', () => {
      it('should respond with a status code of 400', async () => {
        const res = await request(app).post('/api/auth/register');
        expect(res.statusCode).toBe(400);
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

const forgotPasswordTest = () => {
  describe('POST /api/auth/forgotpassword', () => {
    describe('given an email', () => {
      it('should respond with a 200', async () => {
        const res = await request(app).post('/api/auth/forgotpassword').send({
          email,
        });
        expect(res.statusCode).toBe(200);
      });
    });
  });
};

const sessionsTest = () => {
  describe('GET /api/auth/sessions', () => {
    describe('given an accessToken', () => {
      it('should respond with a 200', async () => {
        const res = await request(app)
          .get('/api/auth/sessions')
          .auth(accessToken.token, { type: 'bearer' });
        expect(res.statusCode).toBe(200);
      });
    });
  });
};

const userTest = () => {
  describe('GET /api/auth/user', () => {
    describe('given a accessToken', () => {
      it('should respond with a user', async () => {
        const res = await request(app)
          .get('/api/auth/user')
          .auth(accessToken.token, { type: 'bearer' });
        expect(res.statusCode).toBe(200);
        expect(res.body.user).toBeDefined();
      });
    });
  });
};

const updateCredsTest = () => {
  describe('PUT /api/auth/updatecreds', () => {
    describe('given a username, email and password', () => {
      it('should respond with a status 200 code', async () => {
        const res = await request(app)
          .put('/api/auth/updatecreds')
          .auth(accessToken.token, { type: 'bearer' })
          .send({
            name,
            email,
            password,
          });
        expect(res.statusCode).toBe(200);
      });
    });

    describe('No token provided', () => {
      it('should respond with a status code of 403', async () => {
        const res = await request(app).put('/api/auth/updatecreds').send({
          name,
          email,
          password,
        });
        expect(res.statusCode).toBe(403);
      });
    });
  });
};

const resetPasswordTest = () => {
  describe('PUT /api/auth/resetpassword/:resetToken', () => {
    describe('given a bad token', () => {
      it('should respond with a 400', async () => {
        const res = await request(app)
          .put(`/api/auth/resetpassword/badToken`)
          .send(password);
        expect(res.statusCode).toBe(400);
      });
    });
  });
};

const logoutTest = () => {
  describe('Delete /api/auth/logout', () => {
    describe('given a accessToken', () => {
      it('should respond with a 200', async () => {
        const res = await request(app)
          .delete(`/api/auth/logout`)
          .auth(accessToken.token, { type: 'bearer' });
        expect(res.statusCode).toBe(200);
      });
    });
  });
};

const deleteUserTest = () => {
  loginTest();
  describe('Delete /api/auth/delete', () => {
    describe('given a accessToken', () => {
      it('should respond with a 200', async () => {
        const res = await request(app)
          .delete(`/api/auth/delete`)
          .auth(accessToken.token, { type: 'bearer' });
        expect(res.statusCode).toBe(200);
      });
    });
  });
};

registerTest();
loginTest();
forgotPasswordTest();
sessionsTest();
userTest();
updateCredsTest();
resetPasswordTest();
logoutTest();
deleteUserTest();
