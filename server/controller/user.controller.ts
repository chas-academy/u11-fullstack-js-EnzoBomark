import { NextFunction, Request, Response } from 'express';
import { omit, get } from 'lodash';
import crypto from 'crypto';
import log from '../logger';
import config from 'config';
import { SERVICE } from '../service';
import { MODEL } from '../model';
import { UTILS } from '../utils';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await SERVICE.createUser(req.body);

    // Create a sassion
    const session = await SERVICE.createSession(
      user._id,
      req.get('user-agent') || ''
    );

    return res.sendStatus(201);
  } catch (error) {
    res.status(409).send({ error: 'Email already exist' });
  }
};

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');

    const user = await SERVICE.findUser({ _id: userId });

    if (!user) {
      return res.sendStatus(404);
    }

    return res.status(200).send({
      user: omit(user, [
        'password',
        'resetPasswordToken',
        'resetPasswordExpire',
      ]),
    });
  } catch (error) {
    res.status(404).send({ error: (error as Error).message });
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');
    const update = req.body;

    const user = await SERVICE.findUser({ _id: userId });

    if (!user) {
      return res.sendStatus(404);
    }

    if (!user.name === req.body.name) user.name = req.body.name;
    if (!user.email === req.body.email) user.email = req.body.email;
    if (!user.password === req.body.password) user.password = req.body.password;

    await user.save();

    return res.status(200).send({
      success: 'User updated',
    });
  } catch (error) {
    res.status(404).send({ error: (error as Error).message });
  }
};

export const forgotUserPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await MODEL.User.findOne({ email });

    if (!user) {
      return next(res.status(409).send('Email could not be sent'));
    }

    // Get a reset token and add a hashed (private) version to the database
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Reset url provided in the reset email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

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

      return next(res.status(500).send('Email could not be sent'));
    }
  } catch (error) {
    return error as Error;
  }
};

export const resetUserPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await MODEL.User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(res.status(400).send('Invalid token'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).send({
      success: 'Password reset succsess',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = get(req, 'user._id');

    const user = await SERVICE.findUser({ _id: userId });

    if (!user) {
      return res.sendStatus(404);
    }

    if (String(user._id) !== String(userId)) {
      return res.sendStatus(401);
    }

    await SERVICE.deleteUser({ _id: userId });

    return res.sendStatus(200);
  } catch (error) {
    res.status(409).send({ error: error });
  }
};

export const addSavedArticleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = get(req, 'user._id');

    const user = await SERVICE.findUser({ _id: userId });

    if (!user) {
      return res.sendStatus(404);
    }

    if (String(user._id) !== String(userId)) {
      return res.sendStatus(401);
    }

    //add logic

    return res.sendStatus(200);
  } catch (error) {
    res.status(409).send({ error: error });
  }
};

export const getSavedArticlesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = get(req, 'user._id');

    const user = await SERVICE.findUser({ _id: userId });

    if (!user) {
      return res.sendStatus(404);
    }

    if (String(user._id) !== String(userId)) {
      return res.sendStatus(401);
    }

    //add logic

    return res.sendStatus(200);
  } catch (error) {
    res.status(409).send({ error: error });
  }
};

export const deleteSavedArticleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = get(req, 'user._id');

    const user = await SERVICE.findUser({ _id: userId });

    if (!user) {
      return res.sendStatus(404);
    }

    if (String(user._id) !== String(userId)) {
      return res.sendStatus(401);
    }

    //add logic

    return res.sendStatus(200);
  } catch (error) {
    res.status(409).send({ error: error });
  }
};
