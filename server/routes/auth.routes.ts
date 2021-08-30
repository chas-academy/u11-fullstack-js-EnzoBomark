import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';
import { SCHEMA } from '../schema/';

export const Auth = (app: Express) => {
  app.post(
    '/api/auth/register',
    MW.validateRequest(SCHEMA.createUserSchema),
    CONT.createUserHandler
  );

  //Login
  app.post(
    '/api/auth/login',
    MW.validateRequest(SCHEMA.createUserSessionSchema),
    CONT.createUserSessionHandler
  );

  //Forgot password
  app.post('/api/auth/forgotpassword', CONT.forgotUserPasswordHandler);

  //Reset password
  app.put('/api/auth/resetpassword/:resetToken', CONT.resetUserPasswordHandler);

  //Get the user session
  app.get('/api/auth/sessions', MW.requireUser, CONT.getUserSessionHandler);

  //Logout
  app.delete(
    '/api/auth/logout',
    MW.requireUser,
    CONT.invalidateUserSessionHandler
  );
};
