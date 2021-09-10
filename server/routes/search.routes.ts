import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';

export const Search = (app: Express) => {
  app.post('/api/search/articles', CONT.getSearchQueryHandler);
};
