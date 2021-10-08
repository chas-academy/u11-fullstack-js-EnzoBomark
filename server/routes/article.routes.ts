import { Express } from 'express';

import { CONT } from '../controller/';
import { MW } from '../middleware/';
import { SCHEMA } from '../schema/';

export const Article = (app: Express) => {
  //Get article
  app.get('/api/article/:articleId', CONT.getArticleHandler);

  //Get user saved articles
  app.get('/api/user/save', MW.requireUser, CONT.getSavedArticlesHandler);

  //Create article
  app.post(
    '/api/article',
    [MW.requireUser, MW.validateRequest(SCHEMA.createArticleSchema)],
    CONT.createArticleHandler
  );

  //Add article to saved
  app.post(
    '/api/user/save/:articleId',
    MW.requireUser,
    CONT.addSavedArticleHandler
  );

  //Search articles
  app.post(
    '/api/article/search',
    MW.validateRequest(SCHEMA.searchSchema),
    CONT.getArticlesHandler
  );

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

  //Remove article from saved
  app.delete(
    '/api/user/save/:articleId',
    MW.requireUser,
    CONT.deleteSavedArticleHandler
  );
};
