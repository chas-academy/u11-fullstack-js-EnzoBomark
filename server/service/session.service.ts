import { FilterQuery, LeanDocument, UpdateQuery } from 'mongoose';
import { get } from 'lodash';
import config from 'config';
import * as MODEL from '../model';
import * as UTIL from '../utils';
import * as SERVICE from '../service';

export const createSession = async (userId: string, userAgent: string) => {
  const session = await MODEL.Session.create({ user: userId, userAgent });

  return session.toJSON();
};

export const createAccessToken = ({
  user,
  session,
}: {
  user:
    | Omit<MODEL.UserDocument, 'password'>
    | LeanDocument<Omit<MODEL.UserDocument, 'password'>>;
  session:
    | Omit<MODEL.SessionDocument, 'password'>
    | LeanDocument<Omit<MODEL.SessionDocument, 'password'>>;
}) => {
  //Build and return the new access token
  const accessToken = UTIL.sign(
    { ...user, session: session._id },
    { expiresIn: config.get('ACCESS_TOKEN_TTL') } // 15 min
  );

  return accessToken;
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  // Decode the refresh token
  const { decoded } = UTIL.decode(refreshToken);

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
  query: FilterQuery<MODEL.SessionDocument>,
  update: UpdateQuery<MODEL.SessionDocument>
) => {
  return MODEL.Session.updateOne(query, update);
};

export const findSessions = async (
  query: FilterQuery<MODEL.SessionDocument>
) => {
  return MODEL.Session.find(query).lean();
};
