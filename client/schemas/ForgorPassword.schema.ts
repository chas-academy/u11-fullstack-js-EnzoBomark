import { object, string, InferType } from 'yup';

export const ForgotPasswordSchema = object({
  email: string().email('Email must be a valid email address').required('Email is required'),
});

export type Props = InferType<typeof ForgotPasswordSchema>;
