import { Request, Response } from 'express';
import { fstat } from 'fs';
import { get } from 'lodash';
import { SERVICE } from '../service';

export const createArticleHandler = async (req: Request, res: Response) => {
  // const userId = get(req, 'user._id');
  // const body = req.body;
  // const image = req.file!;
  // if (!image) {
  //   return res.sendStatus(404);
  // }
  // const uploadInfo = await SERVICE.uploadToS3(image);
  // body.image! = uploadInfo;
  // const post = await SERVICE.createArticle({ ...body, user: userId });
  // return res.send(post);
};
