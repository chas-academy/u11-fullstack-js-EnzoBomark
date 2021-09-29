import { S } from '@/styles/pages/Login.style';
import { NextPage } from 'next';
import { useState } from 'react';
import { LoginSchema, Props } from '@/schemas/Login.schema';
import { AuthResponse } from '@/interfaces/AuthResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import router from 'next/router';
import Link from 'next/link';
import Form from '@/components/shared/templates/Form';
import Cookies from 'js-cookie';
import Text from '@/components/shared/inputs/Text/Index';
import Password from '@/components/shared/inputs/Password/Index';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';

const Login: NextPage = () => {
  const res = resolver<Props>(LoginSchema);
  const [values, setValues] = useState<Props>();
  const { fetch, isLoading, hasError, data } = useFetch<AuthResponse>(() =>
    post('auth/login', values)
  );

  useMount(async () => await fetch(), [values]);

  useMount(() => {
    Cookies.set('access_token', data.success.accessToken);
    Cookies.set('refresh_token', data.success.refreshToken);
    router.push('/');
  }, [data]);

  return (
    <S.Login>
      <S.H1>Log In Now</S.H1>
      <S.H2>Please login to continue</S.H2>
      <Form onSubmit={res.handleSubmit((e) => setValues(e))} error={hasError}>
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
        <S.Submit>Login</S.Submit>
      </Form>
      <S.P>
        Dont have an account?
        <Link href="/register">
          <S.A>Register</S.A>
        </Link>
      </S.P>
    </S.Login>
  );
};

import { Public } from '@/guards/public.guard';
export const getServerSideProps = Public();

export default Login;
