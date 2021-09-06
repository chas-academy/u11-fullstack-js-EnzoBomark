import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';
import { SCHEMA } from '../schema/';

export const Article = (app: Express) => {
  //Create article
  app.post(
    '/api/article',
    [MW.requireUser, MW.validateRequest(SCHEMA.createArticleSchema)],
    CONT.createArticleHandler
  );

  //Update artucle
  app.put(
    '/api/article/:articleId',
    [MW.requireUser, MW.validateRequest(SCHEMA.createArticleSchema)],
    CONT.updateArticleHandler
  );

  //Get artucle
  app.get('/api/article/:articleId', CONT.getArticleHandler);

  //Delete artucle
  app.delete(
    '/api/article/:articleId',
    [MW.requireUser, MW.validateRequest(SCHEMA.deleteArticleSchema)],
    CONT.deleteArticleHandler
  );
};
