import supertest from 'supertest';

import { app } from '../test-setup';
import { getToken } from './getToken.utils';

const request = supertest(app);

export const getArticle = async () => {
  const res = await request
    .post('/api/article')
    .send({
      title: 'article',
      image: 'fakeimagelink',
      tags: ['test'],
      body: [{ type: 'paragraph', text: 'test' }],
      readTime: 2,
    })
    .auth(await getToken(), { type: 'bearer' });

  return res.body.success;
};
