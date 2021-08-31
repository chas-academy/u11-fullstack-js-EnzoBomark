import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { MODEL, ArticleDocument } from '../model';

export const createArticle = (input: DocumentDefinition<ArticleDocument>) => {
  return MODEL.Article.create(input);
};

export const findArticle = (
  query: FilterQuery<ArticleDocument>,
  options: QueryOptions = { lean: true }
) => {
  return MODEL.Article.findOne(query, {}, options);
};

export const findAndUpdateArticle = (
  query: FilterQuery<ArticleDocument>,
  update: UpdateQuery<ArticleDocument>,
  options: QueryOptions
) => {
  return MODEL.Article.findOneAndUpdate(query, update, options);
};

export const deleteArticle = (query: FilterQuery<ArticleDocument>) => {
  return MODEL.Article.deleteOne(query);
};
