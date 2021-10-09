import { Admin } from './admin.routes';
import { Article } from './article.routes';
import { S3 } from './s3.routes';
import { User } from './user.routes';

export const ROUTES = {
  User,
  Article,
  S3,
  Admin,
};
