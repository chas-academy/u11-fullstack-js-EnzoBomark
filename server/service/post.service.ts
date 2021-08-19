import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import * as MODEL from '../model';

export const createPost = (input: DocumentDefinition<MODEL.PostDocument>) => {
  return MODEL.Post.create(input);
};

export const findPost = (
  query: FilterQuery<MODEL.PostDocument>,
  options: QueryOptions = { lean: true }
) => {
  return MODEL.Post.findOne(query, {}, options);
};

export const findAndUpdate = (
  query: FilterQuery<MODEL.PostDocument>,
  update: UpdateQuery<MODEL.PostDocument>,
  options: QueryOptions
) => {
  return MODEL.Post.findOneAndUpdate(query, update, options);
};

export const deletePost = (query: FilterQuery<MODEL.PostDocument>) => {
  return MODEL.Post.deleteOne(query);
};
