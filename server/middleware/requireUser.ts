import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, 'user');

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};
