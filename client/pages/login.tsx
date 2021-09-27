import { S } from '@/styles/pages/Login.style';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import router from 'next/router';
import { LoginSchema, Props } from '@/schemas/Login.schema';
import { Response } from '@/interfaces/AuthResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import Form from '@/components/shared/templates/Form';
import Submit from '@/components/shared/buttons/SubmitButton';
import Cookies from 'js-cookie';
import Text from '@/components/shared/inputs/Text/Index';
import Password from '@/components/shared/inputs/Password/Index';

const Login: NextPage = () => {
  const [error, setError] = useState('');
  const res = resolver<Props>(LoginSchema);

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
  return (
    <S.Login>
      <S.H1>Log In Now</S.H1>
      <S.H2>Please login to continue</S.H2>
      <Form onSubmit={res.handleSubmit(formValues)} error={error}>
        <Text
          id="email"
          placeholder="Email"
          error={res.formState.errors.email?.message}
          register={res.register('email')}
        />
        <Password
          id="password"
          placeholder="Password"
          error={res.formState.errors.password?.message}
          register={res.register('password')}
        />
        <S.P>
          <Link href="/forgot-password">
            <S.A>Forgot password?</S.A>
          </Link>
        </S.P>
        <Submit>Login</Submit>
      </Form>
      <S.P>
        Dont have an account?
        <Link href="/Register">
          <S.A>Register</S.A>
        </Link>
      </S.P>
    </S.Login>
  );
};

export default Login;
