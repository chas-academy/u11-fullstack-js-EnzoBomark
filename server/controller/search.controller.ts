import { Request, Response } from 'express';
import { get } from 'lodash';

import { MODEL, UserDocument } from '../model';
import { SERVICE } from '../service';
import { removePassword } from '../utils/removePassword.utils';

export const getPaginatedArticlesHandler = async (req: Request, res: Response) => {
  const { query, page } = get(req, 'body');

  const regexQuery = new RegExp(query, 'i');
  const regex = [{ title: { $regex: regexQuery } }, { tags: { $in: [regexQuery] } }];

  const articles = await SERVICE.paginate(get(MODEL, 'Article'), page, regex);

  if (!articles) {
    return res.status(404).send({ error: 'bad query' });
  }

  // Send articles back
  return res.status(200).send({ success: articles });
};

export const getPaginatedUsersHandler = async (req: Request, res: Response) => {
  const { query, page } = get(req, 'body');

  const regexQuery = new RegExp(query, 'i');
  const regex = [{ name: { $regex: regexQuery } }, { email: { $regex: regexQuery } }];

  const users = await SERVICE.paginate(get(MODEL, 'User'), page, regex);

  if (!users) {
    return res.status(404).send({ error: 'bad query' });
  }

  const { data, objectsFound } = users;

  // Send articles back
  return res.status(200).send({
    success: { data: data.map((user: UserDocument) => removePassword(user)), objectsFound },
  });
};
