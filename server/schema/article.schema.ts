import { object, string, ref } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required'),
    image: string().required('Image is required'),
    body: string()
      .required('Body is required')
      .min(10, 'Body is too short - should be 10 chars minimum.'),
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
