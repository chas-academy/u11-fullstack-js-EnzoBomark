import { Request, Response } from 'express';
import { get } from 'lodash';

import { MODEL } from '../model';

export const getPaginatedArticlesHandler = async (req: Request, res: Response) => {
  const { query, page } = get(req, 'body');

  const regexQuery = new RegExp(query, 'i');
  const regex = [
    { 'user.name': { $regex: regexQuery } },
    { title: { $regex: regexQuery } },
    { tags: { $in: [regexQuery] } },
  ];
  const lookup = { from: 'users', localField: 'user', foreignField: '_id', as: 'user' };
  const omit = { 'user.password': 0 };

  const articles = await MODEL.Article.aggregate()
    .lookup(lookup)
    .match({ $or: regex })
    .skip((page - 1) * 25)
    .project(omit)
    .limit(25);

  if (!articles) return res.status(404).send({ error: 'bad query' });

  return res.status(200).send({ success: articles });
};

export const getPaginatedUsersHandler = async (req: Request, res: Response) => {
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
