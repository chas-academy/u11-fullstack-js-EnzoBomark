import { Request, Response } from 'express';
import { get } from 'lodash';
import { SERVICE } from '../service';

export const createArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const body = req.body;

  const post = await SERVICE.createArticle({ ...body, user: userId });
  return res.send(post);
};
