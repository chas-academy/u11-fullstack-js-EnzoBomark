import { Descendant } from 'slate';

export interface IArticle {
  _id?: string;
  title: string;
  image: string;
  tags: string[];
  body: Descendant[];
  about: string;
  readTime: number;
  user: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ArticlesResponse {
  error?: string;
  success?: IArticle[];
}
