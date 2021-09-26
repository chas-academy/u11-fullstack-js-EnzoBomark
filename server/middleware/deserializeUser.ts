import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { UTILS } from '../utils';
import { SERVICE } from '../service';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = get(req, 'headers.x-refresh');

  const accessToken = get(req, 'headers.authorization');

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
