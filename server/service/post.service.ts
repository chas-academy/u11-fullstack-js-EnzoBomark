import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { MODEL, PostDocument } from '../model';

export const createPost = (input: DocumentDefinition<PostDocument>) => {
  return MODEL.Post.create(input);
};

export const findPost = (
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) => {
  return MODEL.Post.findOne(query, {}, options);
};

export const findAndUpdate = (
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) => {
  return MODEL.Post.findOneAndUpdate(query, update, options);
};

export const deletePost = (query: FilterQuery<PostDocument>) => {
  return MODEL.Post.deleteOne(query);
};
