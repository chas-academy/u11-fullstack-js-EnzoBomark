import supertest from 'supertest';

import { MODEL } from '../../model';
import { app, setupDB } from '../test-setup';

const request = supertest(app);

setupDB('endpoint-testing', true);

describe('POST /api/user/register', () => {
  describe('given a username, email and password', () => {
    it('Should save user to database', async () => {
      const res = await request.post('/api/user/register').send({
        name: 'Obi-Wan Kenobi',
        email: 'testing@gmail.com',
        password: 'test12345',
      });

      // Ensures response status
      expect(res.statusCode).toBe(201);

      // Searches the user in the database
      const user = await MODEL.User.findOne({ email: 'testing@gmail.com' });
      expect(user?.name).toBeTruthy();
      expect(user?.email).toBeTruthy();
    });
  });

  describe('Bad creds', () => {
    it('should respond with a status code of 400', async () => {
      const res = await request.post('/api/user/register');
      expect(res.statusCode).toBe(400);

      // Searches the user in the database
      const user = await MODEL.User.findOne({ email: 'testing@gmail.com' });
      expect(user?.name).toBeFalsy();
      expect(user?.email).toBeFalsy();
    });
  });
});
