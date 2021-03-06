import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

import log from '../logger';

export const validateRequest =
  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      return res.status(400).send({ error: (error as Error).message });
    }
  };
