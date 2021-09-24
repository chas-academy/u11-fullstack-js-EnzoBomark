import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey =
  process.env.PRIVATE_KEY || (config.get('PRIVATE_KEY') as string);

export const sign = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, options);
};

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: (error as Error).message === 'jwt expired',
      decoded: null,
    };
  }
}
