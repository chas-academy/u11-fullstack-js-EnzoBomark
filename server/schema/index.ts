import { createUserSchema } from './user.schema';
import { createUserSessionSchema } from './user.schema';
import { resetPasswordSchema } from './user.schema';
import { createArticleSchema } from './article.schema';
import { updateArticleSchema } from './article.schema';
import { deleteArticleSchema } from './article.schema';
import { searchSchema } from './search.schema';

export const SCHEMA = {
  createUserSchema,
  createUserSessionSchema,
  resetPasswordSchema,
  createArticleSchema,
  updateArticleSchema,
  deleteArticleSchema,
  searchSchema,
};
