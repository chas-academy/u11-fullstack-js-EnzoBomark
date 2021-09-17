import { Request, Response } from 'express';
import { get } from 'lodash';
import log from '../logger';
import { updateArticleSchema } from '../schema/article.schema';
import { SERVICE } from '../service';

export const createArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const author = get(req, 'user.name');
  const body = req.body;
  try {
    const article = await SERVICE.createArticle({
      ...body,
      user: userId,
      author: author,
    });

    return res.status(201).send({ success: get(article, '_id') });
  } catch (error) {
    res.status(409).send({ error: error });
  }
};

export const updateArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const articleId = get(req, 'params.articleId');
  const update = req.body;

  const article = await SERVICE.findArticle({ _id: articleId });

  if (!article) {
    return res.sendStatus(404);
  }

  if (String(article.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedArticle = await SERVICE.findAndUpdateArticle(
    { _id: articleId },
    update,
    {
      new: true,
    }
  );

  return res.status(200).send({ success: get(updatedArticle, '_id') });
};

export const getArticleHandler = async (req: Request, res: Response) => {
  const articleId = get(req, 'params.articleId');
  const article = await SERVICE.findArticle({ _id: articleId });

  if (!article) {
    return res.sendStatus(404);
  }

  return res.status(200).send({ success: article });
};

export const deleteArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const articleId = get(req, 'params.articleId');

  const article = await SERVICE.findArticle({ _id: articleId });

  if (!article) {
    return res.sendStatus(404);
  }

  if (String(article.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await SERVICE.deleteArticle({ _id: articleId });

  return res
    .status(200)
    .send({ success: `${articleId} was successfully deleted` });
};

export const getAllArticlesHandler = async (req: Request, res: Response) => {
  const articles = await SERVICE.getArticles();

  if (!articles) {
    return res.sendStatus(404);
  }

  return res.status(200).send({ success: articles });
};
