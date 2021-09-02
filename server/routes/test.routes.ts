import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';
import { SCHEMA } from '../schema/';

export const Test = (app: Express) => {
  app.post(
    '/api/post',
    [MW.requireUser, MW.validateRequest(SCHEMA.createPostSchema)],
    CONT.createPostHandler
  );

  //Update pos
  app.put(
    '/api/post/:postId',
    [MW.requireUser, MW.validateRequest(SCHEMA.updatePostSchema)],
    CONT.updatePostHandler
  );

  //Get Post
  app.get('/api/post/:postId', CONT.getPostHandler);

  //Delete Post
  app.delete(
    '/api/post/:postId',
    [MW.requireUser, MW.validateRequest(SCHEMA.deletePostSchema)],
    CONT.deletePostHandler
  );
};