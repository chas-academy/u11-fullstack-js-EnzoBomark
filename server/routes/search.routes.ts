import { Express } from 'express';

import { CONT } from '../controller/';
import { MW } from '../middleware/';
import { SCHEMA } from '../schema';

export const Search = (app: Express) => {
  app.post(
    '/api/search',
    MW.validateRequest(SCHEMA.searchSchema),
    CONT.getPaginatedArticlesHandler
  );
};
