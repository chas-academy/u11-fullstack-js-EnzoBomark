import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';
import { SCHEMA } from '../schema';

export const Search = (app: Express) => {
  app.post(
    '/api/search',
    MW.validateRequest(SCHEMA.searchSchema),
    CONT.getPaginatedDataHandler
  );
};
