import request from 'supertest';
import { app } from './index';

const accessToken = { token: '' };
const name = 'jane doe';
const email = 'foo@bar.test';
const password = 'password123';

const article = { id: '' };
const title = 'test';
const image = 'fakeimagelink';
const tags = ['test'];
const body = [{ type: 'paragraph', text: 'test' }];

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

const createArticleTest = () => {
  describe('POST /api/article', () => {
    describe('given a title, tags, image and body', () => {
      test('should respond with a 201 and success message', async () => {
        const res = await request(app)
          .post('/api/article')
          .send({
            title,
            image,
            tags,
            body,
          })
          .auth(accessToken.token, { type: 'bearer' });
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBeDefined();
        article.id = res.body.success;
      });
    });
  });
};

const updateArticleTest = () => {
  describe('PUT /api/article:articleId', () => {
    describe('given a title, tags, image and body', () => {
      test('should respond with a 200 and success message', async () => {
        const res = await request(app)
          .put(`/api/article/${article.id}`)
          .send({
            title,
            image,
            tags,
            body,
          })
          .auth(accessToken.token, { type: 'bearer' });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeDefined();
      });
    });
  });
};

const getArticleTest = () => {
  describe('GET /api/article:articleId', () => {
    describe('given a articleId', () => {
      test('should respond with a 200 and success message', async () => {
        const res = await request(app).get(`/api/article/${article.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeDefined();
      });
    });
  });
};

const getAllArticleTest = () => {
  describe('GET /api/articles', () => {
    test('should respond with a 200 and success message', async () => {
      const res = await request(app).get(`/api/articles`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });
  });
};

const deleteArticleTest = () => {
  describe('DELETE /api/article:articleId', () => {
    describe('given a articleId', () => {
      test('should respond with a 200 and success message', async () => {
        const res = await request(app)
          .delete(`/api/article/${article.id}`)
          .auth(accessToken.token, { type: 'bearer' });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeDefined();
      });
    });
  });
};

//Run tests
registerTest();
loginTest();
createArticleTest();
updateArticleTest();
getArticleTest();
getAllArticleTest();
deleteArticleTest();
