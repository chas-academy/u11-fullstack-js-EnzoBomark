import { createUserSessionHandler } from './session.controller';
import { invalidateUserSessionHandler } from './session.controller';
import { getUserSessionHandler } from './session.controller';
import { createUserHandler } from './user.controller';
import { forgotUserPasswordHandler } from './user.controller';
import { resetUserPasswordHandler } from './user.controller';
import { createArticleHandler } from './article.controller';
import { createSecureS3UrlHandler } from './s3.controller';

// test controller
import { createPostHandler } from './post.controller';
import { updatePostHandler } from './post.controller';
import { getPostHandler } from './post.controller';
import { deletePostHandler } from './post.controller';
import { createImageHandler } from './post.controller';

export const CONT = {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionHandler,
  createUserHandler,
  forgotUserPasswordHandler,
  resetUserPasswordHandler,
  createArticleHandler,
  createSecureS3UrlHandler,
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
  createImageHandler,
};
