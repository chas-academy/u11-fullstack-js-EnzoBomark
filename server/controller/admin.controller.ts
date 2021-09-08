import { NextFunction, Request, Response } from 'express';
import { omit, get } from 'lodash';
import crypto from 'crypto';
import log from '../logger';
import config from 'config';
import { SERVICE } from '../service';
import { MODEL } from '../model';
import { UTILS } from '../utils';

export const adminCreateUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await SERVICE.createUser(req.body);

    // Create a sassion
    const session = await SERVICE.createSession(
      user._id,
      req.get('user-agent') || ''
    );

    return res.send(201);
  } catch (error) {
    log.error(error);
    res.status(409).send({ error: 'Email already exist' });
  }
};

export const adminUpdateUserHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'params.userId');
  const update = req.body;

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await SERVICE.findAndUpdateUser({ _id: userId }, update, {
    new: true,
  });

  return res.send(updatedUser);
};

export const adminGetUsersHandler = async (req: Request, res: Response) => {
  const users = await SERVICE.getUsers();

  if (!users) {
    return res.sendStatus(404);
  }

  return res.send(users);
};

export const adminDeleteUserHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'params.userId');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.sendStatus(404);
  }

  await SERVICE.deleteUser({ _id: user });

  return res.sendStatus(200);
};

export const adminEmailUserHandler = async (req: Request, res: Response) => {
  return res.sendStatus(200);
};
