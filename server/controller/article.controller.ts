import { Request, Response } from 'express';
import { get } from 'lodash';

import { SERVICE } from '../service';

export const createArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const body = get(req, 'body');

  const article = await SERVICE.createArticle({
    ...body,
    user: userId,
  });

  return res.status(201).send({ success: get(article, '_id') });
};

export const updateArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const articleId = get(req, 'params.articleId');
  const update = get(req, 'body');

  const article = await SERVICE.findArticle({ _id: articleId });

  if (!article) {
    return res.status(400).send({ error: 'No article found' });
  }

  if (String(article.user) !== userId) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const updatedArticle = await SERVICE.findAndUpdateArticle({ _id: articleId }, update, {
    new: true,
  });

  return res.status(200).send({ success: get(updatedArticle, '_id') });
};

export const getArticleHandler = async (req: Request, res: Response) => {
  const articleId = get(req, 'params.articleId');

  const article = await SERVICE.findArticle({ _id: articleId });

  if (!article) {
    return res.status(400).send({ error: 'No article found' });
  }

  return res.status(200).send({ success: article });
};

export const deleteArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const articleId = get(req, 'params.articleId');

  const article = await SERVICE.findArticle({ _id: articleId });

  if (!article) {
    return res.status(400).send({ error: 'No article found' });
  }

  if (String(article.user) !== String(userId)) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  await SERVICE.deleteArticle({ _id: articleId });

  return res.status(200).send({ success: `${articleId} was successfully deleted` });
};

export const getAllArticlesHandler = async (req: Request, res: Response) => {
  // const articles = await SERVICE.getArticles();
  // if (!articles) {
  //   return res.status(400).send({ error: 'No article found' });
  // }
  // return res.status(200).send({ success: articles });
};

export const getUserArticles = async (req: Request, res: Response) => {
  // const articles = await SERVICE.getArticles();
  // if (!articles) {
  //   return res.status(400).send({ error: 'No article found' });
  // }
  // return res.status(200).send({ success: articles });
};
