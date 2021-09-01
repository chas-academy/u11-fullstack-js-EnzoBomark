import { createSession } from './session.service';
import { createAccessToken } from './session.service';
import { reIssueAccessToken } from './session.service';
import { updateSession } from './session.service';
import { findSessions } from './session.service';
import { createUser } from './user.service';
import { findUser } from './user.service';
import { validatePassword } from './user.service';
import { createArticle } from './article.service';
import { findArticle } from './article.service';
import { findAndUpdateArticle } from './article.service';
import { deleteArticle } from './article.service';

import { generateUploadUrl } from './s3.service';

//test sercice
import { createPost } from './post.service';
import { findPost } from './post.service';
import { findAndUpdate } from './post.service';
import { deletePost } from './post.service';

export const SERVICE = {
  createSession,
  createAccessToken,
  reIssueAccessToken,
  updateSession,
  findSessions,
  createUser,
  findUser,
  validatePassword,
  createArticle,
  findArticle,
  findAndUpdateArticle,
  deleteArticle,
  generateUploadUrl,
  createPost,
  findPost,
  findAndUpdate,
  deletePost,
};
