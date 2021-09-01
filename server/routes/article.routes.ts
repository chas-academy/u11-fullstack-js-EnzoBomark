import { Express } from 'express';
import { MW } from '../middleware/';
import { CONT } from '../controller/';
import { SCHEMA } from '../schema/';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const Article = (app: Express) => {
  app.post(
    '/api/article',
    [
      MW.requireUser,
      MW.validateRequest(SCHEMA.createArticleSchema),
      upload.single('image'),
    ],
    CONT.createArticleHandler
  );
};
