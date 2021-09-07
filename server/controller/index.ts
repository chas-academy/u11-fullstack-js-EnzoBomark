import { createUserSessionHandler } from './session.controller';
import { invalidateUserSessionHandler } from './session.controller';
import { getUserSessionHandler } from './session.controller';
import { createUserHandler } from './user.controller';
import { forgotUserPasswordHandler } from './user.controller';
import { resetUserPasswordHandler } from './user.controller';
import { deleteUserHandler } from './user.controller';
import { addSavedArticleHandler } from './user.controller';
import { getSavedArticlesHandler } from './user.controller';
import { deleteSavedArticleHandler } from './user.controller';
import { createArticleHandler } from './article.controller';
import { updateArticleHandler } from './article.controller';
import { getArticleHandler } from './article.controller';
import { deleteArticleHandler } from './article.controller';
import { createSecureS3UrlHandler } from './s3.controller';
import { getSearchQueryHandler } from './search.controller';

export const CONT = {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionHandler,
  createUserHandler,
  forgotUserPasswordHandler,
  resetUserPasswordHandler,
  deleteUserHandler,
  addSavedArticleHandler,
  getSavedArticlesHandler,
  deleteSavedArticleHandler,
  createArticleHandler,
  updateArticleHandler,
  getArticleHandler,
  deleteArticleHandler,
  createSecureS3UrlHandler,
  getSearchQueryHandler,
};
