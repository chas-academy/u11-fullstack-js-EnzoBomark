import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';

import Password from '@/components/shared/inputs/Password/Index';
import Text from '@/components/shared/inputs/Text/Index';
import Spinner from '@/components/shared/misc/Spinner';
import Form from '@/components/shared/templates/Form';
import { Public } from '@/guards/public.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import { AuthResponse } from '@/interfaces/AuthResponse.interface';
import {
    LoginSchema,
    Props
} from '@/schemas/Login.schema';
import { S } from '@/styles/pages/Login.style';
import { post } from '@/utils/http.utils';
import { resolver } from '@/utils/resolver.utils';

const Login: NextPage = () => {
  const res = resolver<Props>(LoginSchema);
  const [values, setValues] = useState<Props>();
  const { fetch, isLoading, hasError, data } = useFetch<AuthResponse>(() =>
    post('user/login', values)
  );

  useMount(async () => await fetch(), [values]);

  useMount(() => {
    Cookies.set('access_token', data.success.accessToken);
    Cookies.set('refresh_token', data.success.refreshToken);
    router.push('/');
  }, [data]);

  return (
    <S.Login>
      <Spinner isLoading={isLoading} />

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

export const getServerSideProps = Public();

export default Login;
