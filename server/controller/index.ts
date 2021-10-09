import {
    adminCreateUserHandler,
    adminDeleteUserHandler,
    adminEmailUserHandler,
    adminGetUserHandler,
    adminGetUsersHandler,
    adminUpdateUserHandler
} from './admin.controller';
import {
    createArticleHandler,
    deleteArticleHandler,
    getArticleHandler,
    getArticlesHandler,
    getSavedHandler,
    getUserArticlesHandler,
    likeArticleHandler,
    updateArticleHandler
} from './article.controller';
import { createSecureS3UrlHandler } from './s3.controller';
import {
    createUserSessionHandler,
    getUserSessionHandler,
    invalidateUserSessionHandler
} from './session.controller';
import {
    addSavedArticleHandler,
    createUserHandler,
    deleteUserHandler,
    forgotUserPasswordHandler,
    getUserHandler,
    resetUserPasswordHandler,
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
  likeArticleHandler,
  createArticleHandler,
  updateArticleHandler,
  getArticleHandler,
  deleteArticleHandler,
  getArticlesHandler,
  createSecureS3UrlHandler,
  adminCreateUserHandler,
  adminUpdateUserHandler,
  adminGetUserHandler,
  adminDeleteUserHandler,
  adminEmailUserHandler,
  adminGetUsersHandler,
  getSavedHandler,
  getUserArticlesHandler,
};
