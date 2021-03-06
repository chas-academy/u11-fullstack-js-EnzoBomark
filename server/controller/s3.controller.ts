import { Request, Response } from 'express';

import { SERVICE } from '../service';

export const createSecureS3UrlHandler = async (req: Request, res: Response) => {
  const url = await SERVICE.generateUploadUrl();
  return res.status(200).send({ success: url });
};
