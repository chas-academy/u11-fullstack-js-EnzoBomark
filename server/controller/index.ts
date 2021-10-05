import {
    adminCreateUserHandler, adminDeleteUserHandler, adminEmailUserHandler, adminGetUserHandler,
    adminUpdateUserHandler
} from './admin.controller';
import {
    createArticleHandler, deleteArticleHandler, getArticleHandler, getArticlesHandler,
    updateArticleHandler
} from './article.controller';
import { createSecureS3UrlHandler } from './s3.controller';
import { getUsersHandler } from './search.controller';
import {
    createUserSessionHandler, getUserSessionHandler, invalidateUserSessionHandler
} from './session.controller';
import {
    addSavedArticleHandler, createUserHandler, deleteSavedArticleHandler, deleteUserHandler,
    forgotUserPasswordHandler, getSavedArticlesHandler, getUserHandler, resetUserPasswordHandler,
    updateUserHandler
} from './user.controller';

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
  getArticlesHandler,
  createSecureS3UrlHandler,
  getUsersHandler,
  adminCreateUserHandler,
  adminUpdateUserHandler,
  adminGetUserHandler,
  adminDeleteUserHandler,
  adminEmailUserHandler,
};
