import { Request, Response } from 'express';
import { get } from 'lodash';
import log from '../logger';
import { SERVICE } from '../service';

export const createArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const body = req.body;
  try {
    const post = await SERVICE.createArticle({ ...body, user: userId });

    return res.send({ success: post });
  } catch (error) {
    log.error(error);
    res.status(409).send({ error: error });
  }
};
