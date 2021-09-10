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

  //Update article
  app.put(
    '/api/article/:articleId',
    [MW.requireUser, MW.validateRequest(SCHEMA.createArticleSchema)],
    CONT.updateArticleHandler
  );

  //Get article
  app.get('/api/article/:articleId', CONT.getArticleHandler);

  //Get all articles
  app.get('/api/articles', CONT.getAllArticlesHandler);

  //Delete article
  app.delete(
    '/api/article/:articleId',
    MW.requireUser,
    CONT.deleteArticleHandler
  );
};
