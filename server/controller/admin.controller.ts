import { Request, Response } from 'express';
import { get } from 'lodash';

import { MODEL } from '../model';
import { SERVICE } from '../service';
import { UTILS } from '../utils';
import { removePassword } from '../utils/removePassword.utils';

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

  if (user.name !== req.body.name) user.name = req.body.name;
  if (user.email !== req.body.email) user.email = req.body.email;
  if (user.role !== req.body.role) user.role = req.body.role;

  await user.save();

  return res.status(200).send({ success: 'Admin successfully updated this user' });
};

export const adminGetUserHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'params.userId');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(400).send({ error: 'No user found' });
  }

  return res.status(200).send({
    success: removePassword(user),
  });
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
  const userId = get(req, 'params.userId');
  const { title, body } = req.body;

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(400).send('Email could not be sent');
  }

  try {
    await UTILS.sendMail({
      to: user.email,
      subject: title,
      text: `<p>${body}</p>`,
    });

    res.status(200).send({ success: 'Email sent' });
  } catch (error) {
    res.status(500).send('Email could not be sent');
  }
};

export const getUsersHandler = async (req: Request, res: Response) => {
  const { query, page } = get(req, 'body');

  // regex match atleast one field
  const regexp = RegExp(query, 'gi');
  const regex = {
    $or: [{ name: { $regex: regexp } }, { email: { $regex: regexp } }],
  };

  // remove user password
  const project = { 'user.password': 0 };

  // skip with 25 index
  const skip = (page - 1) * 25;

  // return max 25 objects
  const limit = 25;

  const users = await MODEL.User.aggregate().match(regex).project(project).skip(skip).limit(limit);

  if (!users) return res.status(500).send({ error: "We couldn't load your content" });

  return res.status(200).send({ success: users });
};
