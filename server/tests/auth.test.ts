import request from 'supertest';
import { app } from './index';

const accessToken = { token: '' };
const name = 'jane doe';
const email = 'foo@bar.test';
const password = 'password123';

const registerTest = () => {
  return describe('POST /api/auth/register', () => {
    describe('given a username, email and password', () => {
      it('should respond with a status 201 code', (done) => {
        request(app)
          .post('/api/auth/register')
          .send({
            name,
            email,
            password,
          })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Bad creds', () => {
      it('should respond with a status code of 400', (done) => {
        request(app)
          .post('/api/auth/register')
          .send({})
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
};

const loginTest = () => {
  describe('POST /api/auth/login', () => {
    describe('given an email and password', () => {
      it('should respond with a accessToken', (done) => {
        request(app)
          .post('/api/auth/login')
          .send({
            email,
            password,
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.accessToken).toBeDefined();
            accessToken.token = res.body.accessToken;
            done();
          });
      });
    });
  });
};

const forgotPasswordTest = () => {
  describe('POST /api/auth/forgotpassword', () => {
    describe('given an email', () => {
      it('should respond with a 200', (done) => {
        request(app)
          .post('/api/auth/forgotpassword')
          .send({
            email,
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
};

const sessionsTest = () => {
  describe('GET /api/auth/sessions', () => {
    describe('given an accessToken', () => {
      it('should respond with a 200', (done) => {
        request(app)
          .get('/api/auth/sessions')
          .auth(accessToken.token, { type: 'bearer' })
          .send()
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
};

const userTest = () => {
  describe('GET /api/auth/user', () => {
    describe('given a accessToken', () => {
      it('should respond with a user', (done) => {
        request(app)
          .get('/api/auth/user')
          .auth(accessToken.token, { type: 'bearer' })
          .send()
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
};

const updateCredsTest = () => {
  describe('PUT /api/auth/updatecreds', () => {
    describe('given a username, email and password', () => {
      it('should respond with a status 200 code', (done) => {
        request(app)
          .put('/api/auth/updatecreds')
          .auth(accessToken.token, { type: 'bearer' })
          .send({
            name,
            email,
            password,
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('No token provided', () => {
      it('should respond with a status code of 403', (done) => {
        request(app)
          .put('/api/auth/updatecreds')
          .send({
            name,
            email,
            password,
          })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
};

const resetPasswordTest = () => {
  describe('PUT /api/auth/resetpassword/:resetToken', () => {
    describe('given a bad token', () => {
      it('should respond with a 400', (done) => {
        request(app)
          .put(`/api/auth/resetpassword/badToken`)
          .send(password)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
};

const logoutTest = () => {
  describe('Delete /api/auth/logout', () => {
    describe('given a accessToken', () => {
      it('should respond with a 200', (done) => {
        request(app)
          .delete(`/api/auth/logout`)
          .auth(accessToken.token, { type: 'bearer' })
          .send()
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
};

const deleteUserTest = () => {
  loginTest();
  describe('Delete /api/auth/delete', () => {
    describe('given a accessToken', () => {
      it('should respond with a 200', (done) => {
        request(app)
          .delete(`/api/auth/delete`)
          .auth(accessToken.token, { type: 'bearer' })
          .send()
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
};

//Run tests
registerTest();
loginTest();
forgotPasswordTest();
sessionsTest();
updateCredsTest();
userTest();
resetPasswordTest();
logoutTest();
deleteUserTest();
