import { S } from './Login.style';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { POST } from '@/utils/rest/http.utils';
import Link from 'next/link';
import Form from '@/components/shared/forms/Form';
import VerifiedInput from '@/components/shared/inputs/VerifiedInput';
import Submit from '@/components/shared/buttons/Submit';

const schema = object({
  email: string().email('Email must be a valid email address').required('Email is required'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

type Props = InferType<typeof schema>;

const LoginFrom = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  const formSubmitHandler = async (values: Props) => {
    const response = await POST<{ accessToken: string; error: string }>('auth/login', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    localStorage.setItem('user', response.parsedBody.accessToken);
    router.push('/');
  };

  const emailError = errors?.email?.message;
  const passwordError = errors?.password?.message;

  return (
    <Form submitHandler={handleSubmit(formSubmitHandler)} error={error}>
      <VerifiedInput format="email" error={emailError} register={register('email')} />
      <VerifiedInput format="password" error={passwordError} register={register('password')} />
      <S.P>
        <Link href="/forgot-password">
          <S.A>Forgot password?</S.A>
        </Link>
      </S.P>
      <Submit>Login</Submit>
    </Form>
  );
};

export default LoginFrom;
