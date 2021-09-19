import { object, string, InferType, ref } from 'yup';

export const ResetPasswordSchema = object({
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConf: string().oneOf([ref('password'), null], 'Passwords must match'),
});

export type Props = InferType<typeof ResetPasswordSchema>;
