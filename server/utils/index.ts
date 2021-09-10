import { decode } from './jwt.utils';
import { sign } from './jwt.utils';
import { sendMail } from './sendMail.utils';

export const UTILS = { decode, sign, sendMail };
