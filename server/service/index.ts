import { createSession } from './session.service';
import { createAccessToken } from './session.service';
import { reIssueAccessToken } from './session.service';
import { updateSession } from './session.service';
import { findSessions } from './session.service';
import { createUser } from './user.service';
import { findUser } from './user.service';
import { deleteUser } from './user.service';
import { findAndUpdateUser } from './user.service';
import { validatePassword } from './user.service';
import { createArticle } from './article.service';
import { findArticle } from './article.service';
import { findAndUpdateArticle } from './article.service';
import { deleteArticle } from './article.service';
import { generateUploadUrl } from './s3.service';
import { queryArticles } from './search.service';
import { queryUsers } from './search.service';
import { getArticles } from './admin.service';
import { getUsers } from './admin.service';

export const SERVICE = {
  createSession,
  createAccessToken,
  reIssueAccessToken,
  updateSession,
  findSessions,
  createUser,
  findUser,
  deleteUser,
  findAndUpdateUser,
  validatePassword,
  createArticle,
  findArticle,
  findAndUpdateArticle,
  deleteArticle,
  generateUploadUrl,
  queryArticles,
  queryUsers,
  getArticles,
  getUsers,
};
