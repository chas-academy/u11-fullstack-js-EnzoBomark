import { get } from 'lodash';
import { FilterQuery, LeanDocument, UpdateQuery } from 'mongoose';

import { MODEL, SessionDocument, UserDocument } from '../model';
import { SERVICE } from '../service';
import { UTILS } from '../utils';

export const createSession = async (userId: string, userAgent: string) => {
  const session = await MODEL.Session.create({ user: userId, userAgent });

  return session.toJSON();
};

export const createAccessToken = ({
  user,
  session,
}: {
  user: Omit<UserDocument, 'password'> | LeanDocument<Omit<UserDocument, 'password'>>;
  session: Omit<SessionDocument, 'password'> | LeanDocument<Omit<SessionDocument, 'password'>>;
}) => {
  //Build and return the new access token
  const accessToken = UTILS.sign(
    { ...user, session: session._id },
    {
      expiresIn: process.env.ACCESS_TOKEN_TTL,
    } // 15 min
  );

  return accessToken;
};

export const reIssueAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
  // Decode the refresh token
  const { decoded } = UTILS.decode(refreshToken);

  if (!decoded || !get(decoded, '_id')) return false;

  // Get the session
  const session = await MODEL.Session.findById(get(decoded, '_id'));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await SERVICE.findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
};

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  return MODEL.Session.updateOne(query, update);
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  return MODEL.Session.find(query).lean();
};
