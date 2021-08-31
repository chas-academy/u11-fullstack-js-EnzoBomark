import { Request, Response } from 'express';
import { fstat } from 'fs';
import { get } from 'lodash';
import { SERVICE } from '../service';

export const createPostHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const body = req.body;

  const post = await SERVICE.createPost({ ...body, user: userId });

  return res.send(post);
};

export const updatePostHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const postId = get(req, 'params.postId');
  const update = req.body;

  const post = await SERVICE.findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedPost = await SERVICE.findAndUpdate({ postId }, update, {
    new: true,
  });

  return res.send(updatedPost);
};

export const getPostHandler = async (req: Request, res: Response) => {
  const postId = get(req, 'params.postId');
  const post = await SERVICE.findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
};

export const deletePostHandler = async (req: Request, res: Response) => {
  const userId = get(req, 'user._id');
  const postId = get(req, 'params.postId');

  const post = await SERVICE.findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await SERVICE.deletePost({ postId });

  return res.sendStatus(200);
};

import log from '../logger';

export const createImageHandler = async (req: Request, res: Response) => {
  const image = req.file!;

  if (!image) {
    return res.sendStatus(404);
  }

  const uploadInfo = await SERVICE.uploadToS3(image);

  log.info(uploadInfo);

  return res.sendStatus(200);
};
