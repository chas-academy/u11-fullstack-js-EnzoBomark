import { Express } from 'express';

import { CONT } from '../controller/';
import { MW } from '../middleware/';
import { SCHEMA } from '../schema/';

export const S3 = (app: Express) => {
  app.get('/api/secure/s3', MW.requireUser, CONT.createSecureS3UrlHandler);
};
