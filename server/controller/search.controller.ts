import { Request, Response } from 'express';
import { get } from 'lodash';
import { SERVICE } from '../service';

export const getSearchQueryHandler = async (req: Request, res: Response) => {
  const { query } = get(req, 'body');

  const response = await SERVICE.queryArticles(query);

  if (!response) {
    return res.status(404).send({ error: 'bad query' });
  }

  // Send articles back
  return res.status(200).send({ success: response });
};
