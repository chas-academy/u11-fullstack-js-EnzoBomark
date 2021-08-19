import { Request, Response } from 'express';
import { omit } from 'lodash';
import log from '../logger';
import * as SERVICE from '../service';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await SERVICE.createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (error) {
    log.error(error);
    res.status(409).send(error.message);
  }
};
