const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

exports.protect = async (req, res, next) => {
  let token;

  const hasHeadersAuthBearer =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer');

  if (hasHeadersAuthBearer) {
    // Ignore Bearer tag and extract only token part (Bearer @3dflvjksd346sdflla)
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      next(new ErrorResponse('No user found with this id', 404));
    }

    req.user = user;

    next();
  } catch (error) {
    res.send(error);
    return next(
      new ErrorResponse('Not authorized to access this route test', 401)
    );
  }
};
