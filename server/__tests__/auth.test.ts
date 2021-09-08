import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import { MODEL } from '../model';
import { MW } from '../middleware';
import { ROUTES } from '../routes';

const app = express();
app.use(MW.deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = app.listen(5000, () => ROUTES.Auth(app));

beforeEach((done) => {
  mongoose.connect('mongodb://localhost:2701J/JestDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  done();
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close();
  });
  server.close();
  done();
});

describe('POST /api/auth/register', () => {
  describe('given a username, email and password', () => {
    //should save the data to the db.
    //should respond with json object containing the user id
    test('should respond with a status 201 code', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'test',
        email: 'test@test.test',
        password: 'test12345',
      });
      expect(res.statusCode).toBe(201);
    });
    //should specify json in the content header
  });

  describe('Bad creds', () => {
    //should respond with 403
  });
});
