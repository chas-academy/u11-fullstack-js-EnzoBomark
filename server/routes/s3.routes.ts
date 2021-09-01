import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';
import { SCHEMA } from '../schema/';

export const S3 = (app: Express) => {
  app.get('/api/secure/s3', CONT.createSecureS3UrlHandler);
};
