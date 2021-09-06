import { createUserSchema } from './user.schema';
import { createUserSessionSchema } from './user.schema';
import { createArticleSchema } from './article.schema';
import { updateArticleSchema } from './article.schema';
import { deleteArticleSchema } from './article.schema';

export const SCHEMA = {
  createUserSchema,
  createUserSessionSchema,
  createArticleSchema,
  updateArticleSchema,
  deleteArticleSchema,
};
