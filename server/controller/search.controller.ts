import { Request, Response } from 'express';
import { get } from 'lodash';
import { StringSchema } from 'yup';
import log from '../logger';
import { SERVICE } from '../service';

export const getSearchQueryHandler = async (req: Request, res: Response) => {
  const filter = get(req, 'params.filter');
  const query = get(req, 'params.query');

  const response = await filterCollection(filter, query);

  if (!response) {
    return res.sendStatus(404);
  }

  return res.send(response);
};

const filterCollection = async (filter: String, query: string) => {
  if (filter === 'article') {
    return await SERVICE.queryArticles(query);
  }
  if (filter === 'user') {
    return await SERVICE.queryUsers(query);
  }
  return undefined;
};
