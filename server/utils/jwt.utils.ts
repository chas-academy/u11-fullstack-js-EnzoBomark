import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get('PRIVATE_KEY') as string;

export const sign = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, options);
};
