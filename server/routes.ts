import { Express, Request, Response } from 'express';
import { MW } from './middleware/';
import { CONT } from './controller/';
import { SCHEMA } from './schema/';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // #region AUTH
  //Register
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
  // #endregion

  // #region POST
  //Create a post
  app.post(
    '/api/posts',
    [MW.requireUser, MW.validateRequest(SCHEMA.createPostSchema)],
    CONT.createPostHandler
  );

  //Update pos
  app.put(
    '/api/posts/:postId',
    [MW.requireUser, MW.validateRequest(SCHEMA.updatePostSchema)],
    CONT.updatePostHandler
  );

  //Get Post
  app.get('/api/posts/:postId', CONT.getPostHandler);

  //Delete Post
  app.delete(
    '/api/posts/:postId',
    [MW.requireUser, MW.validateRequest(SCHEMA.deletePostSchema)],
    CONT.deletePostHandler
  );
  // #endregion
};

export default routes;
