import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import log from '../logger';
import * as SERVICE from '../service';
import * as MODEL from '../model';
import * as UTIL from '../utils';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await SERVICE.createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (error) {
    log.error(error);
    res.status(409).send(error.message);
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
      await UTIL.sendMail({
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
) => {};
