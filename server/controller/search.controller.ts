import { Request, Response } from 'express';
import { get } from 'lodash';
import { MODEL } from '../model';
import { SERVICE } from '../service';
import { toTitleCase } from '../utils/toTitleCase.utils';

export const getPaginatedDataHandler = async (req: Request, res: Response) => {
  const page = parseInt(get(req, 'query.page'));
  const limit = parseInt(get(req, 'query.limit'));
  const model = get(req, 'query.model');
  const { query } = get(req, 'body');

  const response = await SERVICE.paginate(
    get(MODEL, `${toTitleCase(model)}`),
    page,
    limit,
    query
  );

  if (!response) {
    return res.status(404).send({ error: 'bad query' });
  }

  // Send articles back
  return res.status(200).send({ success: response });
};
