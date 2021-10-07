import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = get(req, 'user');

  if (!user) {
    return res.status(403).send({ error: 'No user found' });
  }

  if (user.role !== 'admin') {
    return res.status(403).send({ error: 'Not an admin' });
  }

  return next();
};
