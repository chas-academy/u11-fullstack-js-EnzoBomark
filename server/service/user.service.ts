import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import { MODEL, UserDocument, UserSavedArticleDocument } from '../model';

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await MODEL.User.create(input);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return MODEL.User.findOne(query);
};

export const deleteUser = async (query: FilterQuery<UserDocument>) => {
  return MODEL.User.deleteOne(query);
};

export const getUsers = () => {
  return MODEL.User.find();
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

export const findAndUpdateUser = (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) => {
  return MODEL.User.findOneAndUpdate(query, update, options);
};

export const deleteUserSavedArticle = (
  query: FilterQuery<UserSavedArticleDocument>
) => {
  return MODEL.UserSavedArticle.deleteOne(query);
};

export const findUserSavedArticle = (
  query: FilterQuery<UserSavedArticleDocument>,
  options: QueryOptions = { lean: true }
) => {
  return MODEL.UserSavedArticle.findOne(query, {}, options);
};

export const createUserSavedArticle = (
  input: DocumentDefinition<UserSavedArticleDocument>
) => {
  return MODEL.UserSavedArticle.create(input);
};
