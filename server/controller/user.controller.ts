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

    return res.send(201);
  } catch (error) {
    log.error(error);
    res.status(409).send({ error: 'Email already exist' });
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

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(res.status(500).send('Email could not be sent'));
    }
  } catch (error) {
    return error;
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

    res.status(201).json({
      success: true,
      data: 'Password reset succsess',
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
    log.error(error);
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
    log.error(error);
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
    log.error(error);
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
    log.error(error);
    res.status(409).send({ error: error });
  }
};
