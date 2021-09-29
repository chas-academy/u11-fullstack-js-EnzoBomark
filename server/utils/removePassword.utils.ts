import { omit } from 'lodash';

import { UserDocument } from '../model';

export const removePassword = (user: UserDocument) => {
  return omit(user, ['password', 'resetPasswordToken', 'resetPasswordExpire']);
};
