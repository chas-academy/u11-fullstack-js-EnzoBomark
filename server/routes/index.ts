import { Admin } from './admin.routes';
import { Article } from './article.routes';
import { Auth } from './auth.routes';
import { S3 } from './s3.routes';
import { Search } from './search.routes';
import { User } from './user.routes';

export const ROUTES = {
  Auth,
  Article,
  S3,
  Search,
  User,
  Admin,
};
