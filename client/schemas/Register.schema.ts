import { object, string, InferType, ref } from 'yup';

export const RegisterSchema = object({
  name: string().required('Name is required'),
  email: string().email('Email must be a valid email address').required('Email is required'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConf: string()
    .required('Password confirmation is required')
    .oneOf([ref('password'), null], 'Passwords must match'),
});

export type Props = InferType<typeof RegisterSchema>;
