import { createUserSessionHandler } from './session.controller';
import { invalidateUserSessionHandler } from './session.controller';
import { getUserSessionHandler } from './session.controller';
import { createUserHandler } from './user.controller';
import { getUserHandler } from './user.controller';
import { updateUserHandler } from './user.controller';
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
import { getAllArticlesHandler } from './article.controller';
import { createSecureS3UrlHandler } from './s3.controller';
import { getPaginatedUsersHandler } from './search.controller';
import { getPaginatedArticlesHandler } from './search.controller';
import { adminCreateUserHandler } from './admin.controller';
import { adminUpdateUserHandler } from './admin.controller';
import { adminGetUserHandler } from './admin.controller';
import { adminDeleteUserHandler } from './admin.controller';
import { adminEmailUserHandler } from './admin.controller';

export const CONT = {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionHandler,
  createUserHandler,
  getUserHandler,
  updateUserHandler,
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
  getAllArticlesHandler,
  createSecureS3UrlHandler,
  getPaginatedUsersHandler,
  getPaginatedArticlesHandler,
  adminCreateUserHandler,
  adminUpdateUserHandler,
  adminGetUserHandler,
  adminDeleteUserHandler,
  adminEmailUserHandler,
};
