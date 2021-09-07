import { Express } from 'express';
import { MW } from '../middleware';
import { CONT } from '../controller';
import { SCHEMA } from '../schema';

export const User = (app: Express) => {
  //Add article to saved
  app.post(
    '/api/user/save/:articleId',
    MW.requireUser,
    CONT.addSavedArticleHandler
  );

  //Get user saved articles
  app.get('/api/user/save', MW.requireUser, CONT.getSavedArticlesHandler);

  //Remove article from saved
  app.delete(
    '/api/user/save/:articleId',
    MW.requireUser,
    CONT.deleteSavedArticleHandler
  );
};
