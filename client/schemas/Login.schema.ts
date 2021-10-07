import { InferType, object, string } from 'yup';

export const LoginSchema = object({
  email: string().email('Email must be a valid email address').required('Email is required'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

export type Props = InferType<typeof LoginSchema>;
