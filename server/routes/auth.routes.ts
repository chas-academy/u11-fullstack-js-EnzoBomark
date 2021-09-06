import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';
import { SCHEMA } from '../schema/';

export const Auth = (app: Express) => {
  // Register (create user in the db)
  app.post(
    '/api/auth/register',
    MW.validateRequest(SCHEMA.createUserSchema),
    CONT.createUserHandler
  );

  //Login (create user session)
  app.post(
    '/api/auth/login',
    MW.validateRequest(SCHEMA.createUserSessionSchema),
    CONT.createUserSessionHandler
  );

  //Forgot password (send email to user)
  app.post('/api/auth/forgotpassword', CONT.forgotUserPasswordHandler);

  //Reset password (update password on user)
  app.put('/api/auth/resetpassword/:resetToken', CONT.resetUserPasswordHandler);

  //Get the user session (get user sessions to inform about possible invalid devices)
  app.get('/api/auth/sessions', MW.requireUser, CONT.getUserSessionHandler);

  //Logout (Destroy user session)
  app.delete(
    '/api/auth/logout',
    MW.requireUser,
    CONT.invalidateUserSessionHandler
  );

  //Delete user (remove user from the db)
  app.delete('/api/auth/delete', MW.requireUser, CONT.deleteUserHandler);
};
