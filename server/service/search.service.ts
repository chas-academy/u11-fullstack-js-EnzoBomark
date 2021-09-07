import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { MODEL } from '../model';

export const queryArticles = (
  query: string,
  options: QueryOptions = { lean: true }
) => {
  const regexQuery = new RegExp(query, 'i');

  return MODEL.Article.find().or([
    { title: { $regex: regexQuery } },
    { image: { $regex: regexQuery } },
  ]);
};

export const queryUsers = (
  query: string,
  options: QueryOptions = { lean: true }
) => {
  const regexQuery = new RegExp(query, 'i');

  return MODEL.User.find().or([{ name: { $regex: regexQuery } }]);
};
