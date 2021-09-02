import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';
import { SCHEMA } from '../schema/';

export const Article = (app: Express) => {
  app.post(
    '/api/article',
    [MW.requireUser, MW.validateRequest(SCHEMA.createArticleSchema)],
    CONT.createArticleHandler
  );
};
