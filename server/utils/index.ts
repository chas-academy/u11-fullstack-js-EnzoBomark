import { decode } from './jwt.util';
import { sign } from './jwt.util';
import { sendMail } from './sendMail.util';

export const UTILS = { decode, sign, sendMail };
