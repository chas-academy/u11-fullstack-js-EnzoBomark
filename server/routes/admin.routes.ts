import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';
import { SCHEMA } from '../schema/';

export const Admin = (app: Express) => {
  //Create User
  app.post(
    '/api/admin/user',
    [MW.requireAdmin, MW.validateRequest(SCHEMA.adminCreateUserSchema)],
    CONT.adminCreateUserHandler
  );

  //Update User
  app.put(
    '/api/admin/user/:userId',
    [MW.requireAdmin, MW.validateRequest(SCHEMA.adminUpdateUserSchema)],
    CONT.adminUpdateUserHandler
  );

  //Delete user
  app.delete('/api/admin/user/:UserId', MW.requireAdmin, CONT.adminDeleteUserHandler);

  //Get users
  app.get('/api/admin/users', MW.requireAdmin, CONT.adminGetUsersHandler);

  //Get users
  app.get('/api/admin/user/:userId', MW.requireAdmin, CONT.adminGetUserHandler);

  //Get Admin
  app.get('/api/admin/guard', MW.requireAdmin, CONT.getUserHandler);

  //Email user
  app.post('/api/admin/user/:userId/email', MW.requireAdmin, CONT.adminEmailUserHandler);
};
