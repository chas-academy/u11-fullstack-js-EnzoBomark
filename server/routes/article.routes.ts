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

  //Add article to saved
  app.post('/api/user/save/:articleId', MW.requireUser, CONT.addSavedArticleHandler);

  //Search articles
  app.post(
    '/api/article/search',
    MW.validateRequest(SCHEMA.searchSchema),
    CONT.getPaginatedArticlesHandler
  );

  //Update article
  app.put(
    '/api/article/:articleId',
    [MW.requireUser, MW.validateRequest(SCHEMA.createArticleSchema)],
    CONT.updateArticleHandler
  );

  //Get article
  app.get('/api/article/:articleId', CONT.getArticleHandler);

  //Get user saved articles
  app.get('/api/user/save', MW.requireUser, CONT.getSavedArticlesHandler);

  // app.get('/api/user/articles', MW.requireUser, CONT.getUserArticles);

  //Delete article
  app.delete('/api/article/:articleId', MW.requireUser, CONT.deleteArticleHandler);

  //Remove article from saved
  app.delete('/api/user/save/:articleId', MW.requireUser, CONT.deleteSavedArticleHandler);
};
