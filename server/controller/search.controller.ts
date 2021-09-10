import { Request, Response } from 'express';
import { get } from 'lodash';
import { SERVICE } from '../service';

export const getSearchQueryHandler = async (req: Request, res: Response) => {
  const query = get(req, 'params.query');

  const response = await SERVICE.queryArticles(query);

  if (!response) {
    return res.sendStatus(404);
  }

  return res.status(200).send({ success: response });
};
