import Session, { SessionDocument } from '../model/session.model';
import { UserDocument } from '../model/user.model';
import { LeanDocument } from 'mongoose';
import { sign } from '../utils/jwt.utils';
import config from 'config';

export const createSession = async (userId: string, userAgent: string) => {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
};

export const createAccessToken = ({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, 'password'>
    | LeanDocument<Omit<UserDocument, 'password'>>;
  session:
    | Omit<SessionDocument, 'password'>
    | LeanDocument<Omit<SessionDocument, 'password'>>;
}) => {
  //Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get('ACCESS_TOKEN_TTL') } // 15 min
  );

  return accessToken;
};
