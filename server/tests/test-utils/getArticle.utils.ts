import { app } from '../test-setup';
import supertest from 'supertest';
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
    })
    .auth(await getToken(), { type: 'bearer' });

  return res.body.success;
};
