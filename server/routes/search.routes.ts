import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';

export const Search = (app: Express) => {
  //take model, page and limit params
  app.post('/api/search', CONT.getPaginatedDataHandler);
};
