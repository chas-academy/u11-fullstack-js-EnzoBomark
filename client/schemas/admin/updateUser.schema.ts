import { object, string, InferType, ref } from 'yup';

export const AdminUpdateUserSchema = object({
  name: string().required('Name is required'),
  email: string().email('Email must be a valid email address').required('Email is required'),
});

export type Props = InferType<typeof AdminUpdateUserSchema>;
