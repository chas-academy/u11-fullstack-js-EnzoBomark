import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';

export const Search = (app: Express) => {
  app.get('/api/search/articles/:query', CONT.getSearchQueryHandler);
};
