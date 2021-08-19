import { Request, Response } from 'express';
import config from 'config';
import { get } from 'lodash';
import * as SERVICE from '../service';
import * as UTIL from '../utils';

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validate the email and password
  const user = await SERVICE.validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  // Create a sassion
  const session = await SERVICE.createSession(
    user.id,
    req.get('user-agent') || ''
  );

  // Create access token
  const accessToken = SERVICE.createAccessToken({
    user,
    session,
  });

  // Create refresh token
  const refreshToken = UTIL.sign(session, {
    expiresIn: config.get('REFRESH_TOKEN_TTL'), // 1 year
  });

  // Send refresh and access token back
  return res.send({ accessToken, refreshToken });
};

export const invalidateUserSessionHandler = async (
  req: Request,
  res: Response
) => {
  const sessionId = get(req, 'user.session');

  await SERVICE.updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
};
