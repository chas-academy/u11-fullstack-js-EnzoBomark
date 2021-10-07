import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

import { SERVICE } from '../service';
import { UTILS } from '../utils';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = get(req, 'headers.x-refresh');
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  if (!accessToken) return next();

  const { decoded, expired } = UTILS.decode(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await SERVICE.reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader('x-access-token', newAccessToken);

      const { decoded } = UTILS.decode(newAccessToken);

      // @ts-ignore
      req.user = decoded;
    }

    return next();
  }

  return next();
};
