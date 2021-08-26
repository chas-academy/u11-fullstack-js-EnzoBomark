import { createUserSchema } from './user.schema';
import { createUserSessionSchema } from './user.schema';
import { createPostSchema } from './post.schema';
import { updatePostSchema } from './post.schema';
import { deletePostSchema } from './post.schema';

export const SCHEMA = {
  createUserSchema,
  createUserSessionSchema,
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
};
