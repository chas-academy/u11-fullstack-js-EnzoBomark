import { S } from './Login.style';
import { useState } from 'react';
import router from 'next/router';
import { LoginSchema, Props } from '@/schemas/Login.schema';
import { Response } from '@/interfaces/AuthResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import Link from 'next/link';
import Form from '@/components/shared/forms/Form';
import Submit from '@/components/shared/buttons/SubmitButton';
import VerifiedInput from '@/components/shared/inputs/VerifiedInput';
import Cookies from 'js-cookie';

const LoginFrom = () => {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = resolver<Props>(LoginSchema);

  const formValues = async (values: Props) => {
    const response = await post<Response>('auth/login', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    const { accessToken, refreshToken } = response.parsedBody.success;

    Cookies.set('access_token', accessToken);
    Cookies.set('refresh_token', refreshToken);

    router.push('/');
  };

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return (
    <Form submitHandler={handleSubmit(formValues)} error={error}>
      <VerifiedInput format="email" error={emailError} register={register('email')} />
      <VerifiedInput
        type="password"
        format="password"
        error={passwordError}
        register={register('password')}
      />
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
