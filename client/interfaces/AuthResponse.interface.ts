import { IPaginatedArticles } from './Article.interface';

export interface Response {
  error?: string;
  success?: any;
}

export interface ArticlesResponse {
  error?: string;
  success?: IPaginatedArticles;
}
