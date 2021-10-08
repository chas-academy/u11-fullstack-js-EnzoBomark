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
    deleteSavedArticleHandler,
    deleteUserHandler,
    forgotUserPasswordHandler,
    getSavedArticlesHandler,
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
  getSavedArticlesHandler,
  deleteSavedArticleHandler,
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
};
