import { array, object, string } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required'),
    image: string().required('Image is required'),
    body: array().nullable().required('Body is required'),
  }),
};

export const createArticleSchema = object({
  ...payload,
});

export const updateArticleSchema = object({
  params: object({
    articleId: string().required('articleId is required'),
  }),
  ...payload,
});

export const deleteArticleSchema = object({
  ...payload,
});
