import {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery
} from 'mongoose';

import {
    ArticleDocument,
    ArticleLikesDocument,
    MODEL
} from '../model';

//Create
export const createArticle = (input: DocumentDefinition<ArticleDocument>) => {
  return MODEL.Article.create(input);
};

export const createUserArticleLike = (
  input: DocumentDefinition<ArticleLikesDocument>
) => {
  return MODEL.ArticleLikes.create(input);
};

//Find
export const findUserArticleLikes = (
  query: FilterQuery<ArticleLikesDocument>,
  options: QueryOptions = { lean: true }
) => {
  return MODEL.ArticleLikes.findOne(query, {}, options);
};

export const findArticle = (
  query: FilterQuery<ArticleDocument>,
  options: QueryOptions = { lean: true }
) => {
  return MODEL.Article.findOne(query, {}, options).populate('user', 'name');
};

//Update
export const findAndUpdateArticle = (
  query: FilterQuery<ArticleDocument>,
  update: UpdateQuery<ArticleDocument>,
  options: QueryOptions = { lean: true }
) => {
  return MODEL.Article.findOneAndUpdate(query, update, options);
};

//Delete
export const deleteArticle = (query: FilterQuery<ArticleDocument>) => {
  return MODEL.Article.deleteOne(query);
};

export const deleteUserArticleLike = (
  query: FilterQuery<ArticleLikesDocument>
) => {
  return MODEL.ArticleLikes.deleteOne(query);
};
