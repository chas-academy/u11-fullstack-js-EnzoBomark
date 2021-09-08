import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from 'mongoose';
import { MODEL, UserDocument, ArticleDocument } from '../model';

export const getUsers = () => {
  return MODEL.User.find();
};

export const getArticles = () => {
  return MODEL.Article.find();
};
