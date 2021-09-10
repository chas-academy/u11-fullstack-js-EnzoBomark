import { app } from '../test-setup';
import supertest from 'supertest';
const request = supertest(app);

import { MODEL } from '../../model';
import { setupDB } from '../test-setup';

setupDB('endpoint-testing', true);

describe('POST /api/auth/register', () => {
  describe('given a username, email and password', () => {
    it('Should save user to database', async () => {
      const res = await request.post('/api/auth/register').send({
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
      const res = await request.post('/api/auth/register');
      expect(res.statusCode).toBe(400);

      // Searches the user in the database
      const user = await MODEL.User.findOne({ email: 'testing@gmail.com' });
      expect(user?.name).toBeFalsy();
      expect(user?.email).toBeFalsy();
    });
  });
});
