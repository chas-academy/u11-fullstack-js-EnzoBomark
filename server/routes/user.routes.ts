import { Express } from 'express';

import { CONT } from '../controller';
import { MW } from '../middleware';
import { SCHEMA } from '../schema';

export const User = (app: Express) => {
  // Register (create user in the db)
  app.post(
    '/api/user/register',
    MW.validateRequest(SCHEMA.createUserSchema),
    CONT.createUserHandler
  );

  //Login (create user session)
  app.post(
    '/api/user/login',
    MW.validateRequest(SCHEMA.createUserSessionSchema),
    CONT.createUserSessionHandler
  );

  //Forgot password (send email to user)
  app.post('/api/user/forgot-password', CONT.forgotUserPasswordHandler);

  //Search articles
  app.post(
    '/api/user/saved',
    [MW.requireUser, MW.validateRequest(SCHEMA.searchSchema)],
    CONT.getSavedHandler
  );

  //Search articles
  app.post(
    '/api/user/articles',
    [MW.requireUser, MW.validateRequest(SCHEMA.searchSchema)],
    CONT.getUserArticlesHandler
  );

  //Forgot password (send email to user)
  app.post(
    '/api/user/save/:articleId',
    MW.requireUser,
    CONT.addSavedArticleHandler
  );

  //Get the user session (get user sessions to inform about possible invalid devices)
  app.get('/api/user/sessions', MW.requireUser, CONT.getUserSessionHandler);

  //Get the user session (get user sessions to inform about possible invalid devices)
  app.get('/api/user/creds', MW.requireUser, CONT.getUserHandler);

  //Update user creds
  app.put(
    '/api/user/update-creds',
    [MW.requireUser, MW.validateRequest(SCHEMA.updateUserSchema)],
    CONT.updateUserHandler
  );

  //Reset password (update password on user)
  app.put(
    '/api/user/reset-password/:resetToken',
    MW.validateRequest(SCHEMA.resetPasswordSchema),
    CONT.resetUserPasswordHandler
  );

  //Logout (Destroy user session)
  app.delete(
    '/api/user/logout',
    MW.requireUser,
    CONT.invalidateUserSessionHandler
  );

  //Delete user (remove user from the db)
  app.delete('/api/user/delete', MW.requireUser, CONT.deleteUserHandler);
};
