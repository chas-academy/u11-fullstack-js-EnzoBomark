import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

import { MODEL } from '../model';
import { SERVICE } from '../service';
import { UTILS } from '../utils';
import { removePassword } from '../utils/removePassword.utils';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await SERVICE.createUser(req.body);

    return res.status(201).send({ success: 'User successfully created' });
  } catch (error) {
    res.status(409).send({ error: 'Email already exist' });
  }
};

export const getUserHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(404).send({ error: 'No user found' });
  }

  return res.status(200).send({
    success: removePassword(user),
  });
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(400).send({ error: 'No user found' });
  }

  if (String(user._id) !== String(userId)) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  if (!user.name === req.body.name) user.name = req.body.name;
  if (!user.email === req.body.email) user.email = req.body.email;

  await user.save();

  return res.status(200).send({ success: 'User successfully updated' });
};

export const forgotUserPasswordHandler = async (req: Request, res: Response) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  const user = await MODEL.User.findOne({ email });

  if (!user) {
    return res.status(400).send('Email could not be sent');
  }

  // Get a reset token and add a hashed (private) version to the database
  const resetToken = user.getResetPasswordToken();

  await user.save();

  // Reset url provided in the reset email
  const resetUrl = `http://localhost:3000/password-reset/${resetToken}`;

  // HTML message in the mail
  const message = `
       <h1> You have requested a password reset</h1>
       <p>Please go to this link to reset your password</p>
       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
     `;

  try {
    await UTILS.sendMail({
      to: user.email,
      subject: 'Password reset request',
      text: message,
    });

    res.status(200).send({ success: 'Email sent' });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(500).send('Email could not be sent');
  }
};

export const resetUserPasswordHandler = async (req: Request, res: Response) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await MODEL.User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).send({ error: 'Invalid token' });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).send({
    success: 'Password reset succsess',
  });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(400).send({ error: 'No user found' });
  }

  if (String(user._id) !== String(userId)) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  await SERVICE.deleteUser({ _id: userId });

  return res.status(200).send({ success: `${userId} was successfully deleted` });
};

export const addSavedArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(400).send({ error: 'No user found' });
  }

  if (String(user._id) !== String(userId)) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  //add logic

  return res.status(200).send({ success: `${userId} was successfully deleted` });
};

export const getSavedArticlesHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(400).send({ error: 'No user found' });
  }

  if (String(user._id) !== String(userId)) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  //add logic

  return res.status(200).send({ success: `${userId} was successfully deleted` });
};

export const deleteSavedArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');

  const user = await SERVICE.findUser({ _id: userId });

  if (!user) {
    return res.status(400).send({ error: 'No user found' });
  }

  if (String(user._id) !== String(userId)) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  //add logic

  return res.status(200).send({ success: `${userId} was successfully deleted` });
};
