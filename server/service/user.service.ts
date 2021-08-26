import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import { MODEL, UserDocument } from '../model';

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await MODEL.User.create(input);
  } catch (error) {
    throw new Error(error);
  }
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return MODEL.User.findOne(query).lean();
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: UserDocument['email'];
  password: string;
}) => {
  const user = await MODEL.User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
};
