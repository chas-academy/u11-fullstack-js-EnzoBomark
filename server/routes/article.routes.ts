import { Express } from 'express';

import { CONT } from '../controller/';
import { MW } from '../middleware/';
import { SCHEMA } from '../schema/';

export const Article = (app: Express) => {
  //Create article
  app.post(
    '/api/article',
    [MW.requireUser, MW.validateRequest(SCHEMA.createArticleSchema)],
    CONT.createArticleHandler
  );

  //Search articles
  app.post(
    '/api/article/search',
    MW.validateRequest(SCHEMA.searchSchema),
    CONT.getArticlesHandler
  );

  //post article
  app.post('/api/article/:articleId', CONT.getArticleHandler);

  //Like article
  app.post(
    '/api/article/like/:articleId',
    MW.requireUser,
    CONT.likeArticleHandler
  );

  //Update article
  app.put(
    '/api/article/:articleId',
    [MW.requireUser, MW.validateRequest(SCHEMA.createArticleSchema)],
    CONT.updateArticleHandler
  );

  //Delete article
  app.delete(
    '/api/article/:articleId',
    MW.requireUser,
    CONT.deleteArticleHandler
  );
};
