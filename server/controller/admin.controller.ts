import { Request, Response } from 'express';
import { get } from 'lodash';
import { SERVICE } from '../service';
import { MODEL } from '../model';
import { UTILS } from '../utils';

export const adminCreateUserHandler = async (req: Request, res: Response) => {
  try {
    await SERVICE.createUser(req.body);

    return res.status(201).send({ success: 'User successfully created' });
  } catch (error) {
    res.status(409).send({ error: 'Email already exist' });
  }
};

export const adminUpdateUserHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'params.userId');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(400).send({ error: 'No user found' });
  }

  if (!user.name === req.body.name) user.name = req.body.name;
  if (!user.email === req.body.email) user.email = req.body.email;
  if (!user.password === req.body.password) user.password = req.body.password;

  await user.save();

  return res.status(200).send({ success: 'User successfully updated' });
};

export const adminGetUsersHandler = async (req: Request, res: Response) => {
  const users = await SERVICE.getUsers();

  if (!users) {
    return res.status(400).send({ error: 'No user found' });
  }

  return res.status(200).send({ success: users });
};

export const adminDeleteUserHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'params.userId');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(400).send({ error: 'No user found' });
  }

  await SERVICE.deleteUser({ _id: user });

  return res.status(200).send({ success: `${userId} was successfully deleted` });
};

export const adminEmailUserHandler = async (req: Request, res: Response) => {
  return res.status(200).send({ success: 'Email sent' });
};
