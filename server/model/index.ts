import {
    Article,
    ArticleDocument
} from './article.model';
import {
    ArticleLikes,
    ArticleLikesDocument
} from './articleLikes.model';
import {
    Session,
    SessionDocument
} from './session.model';
import {
    User,
    UserDocument
} from './user.model';
import {
    UserSavedArticle,
    UserSavedArticleDocument
} from './userSavedArticle.model';

export const MODEL = {
  Session,
  User,
  Article,
  UserSavedArticle,
  ArticleLikes,
};

export {
  SessionDocument,
  UserDocument,
  ArticleDocument,
  UserSavedArticleDocument,
  ArticleLikesDocument,
};
