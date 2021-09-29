import { array, object, string } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required'),
    tags: array().of(string()).required('One tag is required'),
    image: string().required('Image is required'),
    body: array().of(object().nullable()).nullable().required('Body is required'),
    about: string().required('About is required'),
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
