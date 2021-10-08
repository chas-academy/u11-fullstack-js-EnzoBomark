import {
    createArticle,
    createUserArticleLike,
    deleteArticle,
    deleteUserArticleLike,
    findAndUpdateArticle,
    findArticle,
    findUserArticleLikes
} from './article.service';
import { generateUploadUrl } from './s3.service';
import {
    createAccessToken,
    createSession,
    findSessions,
    reIssueAccessToken,
    updateSession
} from './session.service';
import {
    createUser,
    deleteUser,
    findUser,
    getUsers,
    validatePassword
} from './user.service';

export const SERVICE = {
  createSession,
  createAccessToken,
  reIssueAccessToken,
  updateSession,
  findSessions,
  createUser,
  findUser,
  deleteUser,
  validatePassword,
  createArticle,
  createUserArticleLike,
  findArticle,
  findUserArticleLikes,
  findAndUpdateArticle,
  deleteArticle,
  deleteUserArticleLike,
  generateUploadUrl,
  getUsers,
};
