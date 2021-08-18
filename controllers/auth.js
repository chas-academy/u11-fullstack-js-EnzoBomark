const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const crypto = require('crypto');

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const isEmailAndPasswordProvided = !email || !password;

  if (isEmailAndPasswordProvided) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isPasswordsMatching = await user.matchPasswords(password);

    if (!isPasswordsMatching) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotpassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse('Email could not be sent', 404));
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
      await sendEmail({
        to: user.email,
        subject: 'Password reset request',
        text: message,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  } catch (error) {
    return error;
  }
};

exports.resetpassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse('Invalid reset token', 400));
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

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
