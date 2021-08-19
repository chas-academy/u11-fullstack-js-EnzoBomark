import { Express, Request, Response } from 'express';
import * as MW from './middleware/';
import * as CONT from './controller/';
import * as SCHEMA from './schema/';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // #region AUTH
  //Register
  app.post(
    '/api/users',
    MW.validateRequest(SCHEMA.createUserSchema),
    CONT.createUserHandler
  );

  //Login
  app.post(
    '/api/sessions',
    MW.validateRequest(SCHEMA.createUserSessionSchema),
    CONT.createUserSessionHandler
  );

  //Get the user session
  app.get('/api/sessions', MW.requireUser, CONT.getUserSessionHandler);

  //Logout
  app.delete(
    '/api/sessions',
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
