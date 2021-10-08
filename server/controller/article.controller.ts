import { Request, Response } from 'express';
import { get } from 'lodash';

import { MODEL } from '../model';
import { SERVICE } from '../service';

//GET
export const getArticleHandler = async (req: Request, res: Response) => {
  const articleId = get(req, 'params.articleId');

  const article = await SERVICE.findArticle({ _id: articleId });

  if (!article) {
    return res.status(400).send({ error: 'No article found' });
  }

  return res.status(200).send({ success: article });
};

export const getArticlesHandler = async (req: Request, res: Response) => {
  const { query, page } = get(req, 'body');

  // populate user field
  const populateUser = {
    from: 'users',
    localField: 'user',
    foreignField: '_id',
    as: 'user',
  };

  // populate likes field
  const populateLikes = {
    from: 'articlelikes',
    localField: '_id',
    foreignField: 'article',
    as: 'likes',
  };

  // unwind nested array
  const unwind = 'user';

  // convert ObjectId to string
  const convertUserIdToString = { 'user._id': { $toString: '$user._id' } };

  const countNumberOfLikes = { likes: { $size: '$likes' } };

  // regex match atleast one field
  const regexp = RegExp(query, 'gi');
  const regex = {
    $or: [
      { 'user._id': { $regex: regexp } },
      { 'user.name': { $regex: regexp } },
      { title: { $regex: regexp } },
      { tags: { $in: [regexp] } },
    ],
  };

  // remove user password
  const project = { 'user.password': 0 };

  // skip with 25 index
  const skip = (page - 1) * 25;

  // return max 25 objects
  const limit = 25;

  const articles = await MODEL.Article.aggregate()
    .lookup(populateUser)
    .lookup(populateLikes)
    .unwind(unwind)
    .addFields(convertUserIdToString)
    .addFields(countNumberOfLikes)
    .match(regex)
    .project(project)
    .skip(skip)
    .limit(limit);

  if (!articles)
    return res.status(500).send({ error: "We couldn't load your content" });

  return res.status(200).send({ success: articles });
};

//POST
export const createArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const body = get(req, 'body');

  const article = await SERVICE.createArticle({
    ...body,
    user: userId,
  });

  return res.status(201).send({ success: get(article, '_id') });
};

export const likeArticleHandler = async (req: Request, res: Response) => {
  const userId: string = get(req, 'user._id');
  const articleId: string = get(req, 'params.articleId');

  const userArticleLikes = await SERVICE.findUserArticleLikes({
    article: articleId,
    user: userId,
  });

  if (userArticleLikes) {
    await SERVICE.deleteUserArticleLike({ article: articleId, user: userId });
    return res.status(201).send({ success: 'You unliked this post' });
  }

  if (!userArticleLikes) {
    const test = await SERVICE.createUserArticleLike({
      user: userId,
      article: articleId,
    });
    return res.status(201).send({ success: 'You liked this post' });
  }
};

//PUT
export const updateArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const articleId = get(req, 'params.articleId');
  const update = get(req, 'body');

  const article = await SERVICE.findArticle({ _id: articleId });

  if (!article) {
    return res.status(400).send({ error: 'No article found' });
  }

  if (String(article.user._id) !== userId) {
    return res.status(401).send({ error: 'Unauthorized' });
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

//DELETE
export const deleteArticleHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const articleId = get(req, 'params.articleId');

  const article = await SERVICE.findArticle({ _id: articleId });

  if (!article) {
    return res.status(400).send({ error: 'No article found' });
  }

  if (String(article.user._id) !== String(userId)) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  await SERVICE.deleteArticle({ _id: articleId });

  return res
    .status(200)
    .send({ success: `${articleId} was successfully deleted` });
};
