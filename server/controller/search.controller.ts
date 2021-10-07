import { Request, Response } from 'express';
import { get } from 'lodash';

import { MODEL } from '../model';

export const getUsersHandler = async (req: Request, res: Response) => {
  const { query, page } = get(req, 'body');

  const regexQuery = new RegExp(query, 'i');
  const regex = [{ name: { $regex: regexQuery } }, { email: { $regex: regexQuery } }];
  const omit = { password: 0 };

  const users = await MODEL.User.aggregate()
    .match({ $or: regex })
    .skip((page - 1) * 25)
    .project(omit)
    .limit(25);

  if (!users) return res.status(404).send({ error: 'bad query' });

  return res.status(200).send({ success: users });
};
