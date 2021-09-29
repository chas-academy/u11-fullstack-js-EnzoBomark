import {
    createArticle, deleteArticle, findAndUpdateArticle, findArticle, getArticles
} from './article.service';
import { paginate } from './paginate.service';
import { generateUploadUrl } from './s3.service';
import {
    createAccessToken, createSession, findSessions, reIssueAccessToken, updateSession
} from './session.service';
import { createUser, deleteUser, findUser, getUsers, validatePassword } from './user.service';

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
  findArticle,
  findAndUpdateArticle,
  deleteArticle,
  generateUploadUrl,
  paginate,
  getArticles,
  getUsers,
};
