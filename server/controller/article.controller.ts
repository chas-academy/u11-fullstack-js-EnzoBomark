import { Request, Response } from 'express';
import { get } from 'lodash';

import { MODEL } from '../model';
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

export const getArticlesHandler = async (req: Request, res: Response) => {
  const { query, page } = get(req, 'body');

  // populate user field
  const lookup = { from: 'users', localField: 'user', foreignField: '_id', as: 'user' };

  // unwind nested array
  const unwind = 'user';

  // convert ObjectId to string
  const addFields = { 'user._id': { $toString: '$user._id' } };

  // regex match atleast one field
  const regex = {
    $or: [
      { 'user._id': { $regex: new RegExp(query, 'i') } },
      { 'user.name': { $regex: new RegExp(query, 'i') } },
      { title: { $regex: new RegExp(query, 'i') } },
      { tags: { $in: [new RegExp(query, 'i')] } },
    ],
  };

  // remove user password
  const project = { 'user.password': 0 };

  // skip with 25 index
  const skip = (page - 1) * 25;

  // return max 25 objects
  const limit = 25;

  const articles = await MODEL.Article.aggregate()
    .lookup(lookup)
    .unwind(unwind)
    .addFields(addFields)
    .match(regex)
    .project(project)
    .skip(skip)
    .limit(limit);

  if (!articles) return res.status(500).send({ error: "We couldn't load your content" });

  return res.status(200).send({ success: articles });
};
