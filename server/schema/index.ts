import { createArticleSchema, deleteArticleSchema, updateArticleSchema } from './article.schema';
import { searchSchema } from './search.schema';
import {
    adminCreateUserSchema, adminUpdateUserSchema, createUserSchema, createUserSessionSchema,
    resetPasswordSchema, updateUserSchema
} from './user.schema';

export const SCHEMA = {
  createUserSchema,
  updateUserSchema,
  createUserSessionSchema,
  adminCreateUserSchema,
  adminUpdateUserSchema,
  resetPasswordSchema,
  createArticleSchema,
  updateArticleSchema,
  deleteArticleSchema,
  searchSchema,
};
