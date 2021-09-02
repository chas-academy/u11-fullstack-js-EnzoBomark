import { S } from './ResetPassword.style';
import { useForm } from 'react-hook-form';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { POST } from '@/utils/rest/http.utils';
import Link from 'next/link';
import Form from '@/components/shared/forms/Form';
import VerifiedInput from '@/components/shared/inputs/VerifiedInput';
import Submit from '@/components/shared/buttons/Submit';

const schema = object({
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConf: string().oneOf([ref('password'), null], 'Passwords must match'),
});

type Props = InferType<typeof schema>;

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  const formSubmitHandler = async (values: Props) => {
    const response = await POST('auth/reset-password', values);

    console.log(response);
  };

  const passwordError = errors?.password?.message;
  const passwordConfError = errors?.passwordConf?.message;

  return (
    <Form submitHandler={handleSubmit(formSubmitHandler)}>
      <VerifiedInput format="password" error={passwordError} register={register('password')} />
      <VerifiedInput
        format="confirmation"
        error={passwordConfError}
        register={register('passwordConf')}
      />
      <Submit>Login</Submit>
    </Form>
  );
};

export default ResetPasswordForm;
