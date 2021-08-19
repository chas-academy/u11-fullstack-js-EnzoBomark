import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createSession, createAccessToken } from '../service/session.service';
import config from 'config';
import { omit } from 'lodash';
import { sign } from '../utils/jwt.utils';
import log from '../logger';

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  // Create a sassion
  const session = await createSession(user.id, req.get('user-agent') || '');

  // Create access token
  const accessToken = createAccessToken({
    user,
    session,
  });

  // Create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get('REFRESH_TOKEN_TTL'), // 1 year
  });

  // Send refresh and access token back
  return res.send({ accessToken, refreshToken });
};
