import { Descendant } from 'slate';

export interface IArticle {
  _id?: string;
  title: string;
  image: string;
  tags: string[];
  date: string;
  body: Descendant[];
  about: string;
  author?: string;
  readTime: number;
}

export interface IPaginatedArticles {
  data: IArticle[];
  objectsFound: number;
}

export interface ArticlesResponse {
  error?: string;
  success?: IPaginatedArticles;
}
