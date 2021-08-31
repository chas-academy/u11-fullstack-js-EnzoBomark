import { createUserSchema } from './user.schema';
import { createUserSessionSchema } from './user.schema';
import { createArticleSchema } from './article.schema';
import { updateArticleSchema } from './article.schema';
import { deleteArticleSchema } from './article.schema';

//test schema
import { createPostSchema } from './post.schema';
import { updatePostSchema } from './post.schema';
import { deletePostSchema } from './post.schema';

export const SCHEMA = {
  createUserSchema,
  createUserSessionSchema,
  createArticleSchema,
  updateArticleSchema,
  deleteArticleSchema,
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
};
