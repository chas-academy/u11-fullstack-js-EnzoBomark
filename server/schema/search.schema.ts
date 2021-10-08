import {
    number,
    object
} from 'yup';

const payload = {
  body: object({
    page: number().required('Page is required'),
  }),
};

export const searchSchema = object({
  ...payload,
});
