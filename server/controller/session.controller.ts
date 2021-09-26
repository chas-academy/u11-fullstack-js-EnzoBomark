import { Request, Response } from 'express';
import { get } from 'lodash';
import { SERVICE } from '../service';
import { UTILS } from '../utils';

export const createUserSessionHandler = async (req: Request, res: Response) => {
  const { email, password } = get(req, 'body');
  // Validate the email and password
  const user = await SERVICE.validatePassword({ email, password });

  if (!user) {
    return res.status(401).send({ error: 'Invalid username or password' });
  }

  // Create a session
  const session = await SERVICE.createSession(
    user._id,
    req.get('user-agent') || ''
  );

  // Create access token
  const accessToken = SERVICE.createAccessToken({
    user,
    session,
  });

  // Create refresh token
  const refreshToken = UTILS.sign(session, {
    expiresIn: process.env.REFRESH_TOKEN_TTL, // 1 year
  });

  if (process.env.NODE_ENV === 'production') {
    res.cookie('refresh_token', refreshToken, { httpOnly: true, domain: process.env.CLIENT_URL, sameSite: false });
    res.cookie('access_token', accessToken, { httpOnly: true, domain: process.env.CLIENT_URL, sameSite: false });
  } else {
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.cookie('access_token', accessToken, { httpOnly: true });
  }

  console.log(process.env.CLIENT_URL);

  // Send refresh and access token back
  return res.status(200).send({ success: 'Session Created' });
};

export const invalidateUserSessionHandler = async (
  req: Request,
  res: Response
) => {
  const sessionId = get(req, 'user.session');

  // Unvalidate current session
  await SERVICE.updateSession({ _id: sessionId }, { valid: false });

  
  if (process.env.NODE_ENV === 'production') {
    res.cookie('refresh_token', { httpOnly: true, domain: process.env.CLIENT_URL, sameSite: false });
    res.cookie('access_token', { httpOnly: true, domain: process.env.CLIENT_URL, sameSite: false });
  } else {
    res.cookie('refresh_token', { httpOnly: true });
    res.cookie('access_token', { httpOnly: true });
  }

  return res.status(200).send({ success: 'Session logged out' });
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');

  // Get all user sessions
  const sessions = await SERVICE.findSessions({ user: userId, valid: true });

  // Send sessions and userId back
  return res.status(200).send({ sessions, userId });
};
