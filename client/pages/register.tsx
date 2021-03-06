import { NextPage } from 'next';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';

import Password from '@/components/shared/inputs/Password/Index';
import Text from '@/components/shared/inputs/Text/Index';
import Spinner from '@/components/shared/misc/Spinner';
import Form from '@/components/shared/templates/Form';
import Public from '@/guards/public.guard';
import useFetch from '@/hooks/useFetch.hooks';
import useMount from '@/hooks/useMount';
import { AuthResponse } from '@/interfaces/AuthResponse.interface';
import { Props, RegisterSchema } from '@/schemas/Register.schema';
import { S } from '@/styles/pages/Register.style';
import { post } from '@/utils/http.utils';
import resolver from '@/utils/resolver.utils';

const Register: NextPage = () => {
  const res = resolver<Props>(RegisterSchema);
  const [values, setValues] = useState<Props>();
  const { fetch, isLoading, hasError, data } = useFetch<AuthResponse>(() =>
    post('user/register', values)
  );

  useMount(async () => await fetch(), [values]);
  useMount(() => router.push('/login'), [data]);

  return (
    <S.Register>
      <Spinner isLoading={isLoading} />

      <S.H1>Sign Up Now</S.H1>
      <S.H2>Please fill in the details and create an account</S.H2>
      <Form onSubmit={res.handleSubmit((e) => setValues(e))} error={hasError}>
        <Text
          id="name"
          placeholder="Name"
          error={res.formState.errors.name?.message}
          register={res.register('name')}
        />
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
        <Password
          id="passwordConf"
          placeholder="Password Confirmation"
          error={res.formState.errors.passwordConf?.message}
          register={res.register('passwordConf')}
        />
        <S.Submit>Register</S.Submit>
      </Form>
      <S.P>
        Already have an account?
        <Link href="/login">
          <S.A>Login</S.A>
        </Link>
      </S.P>
    </S.Register>
  );
};

export const getServerSideProps = Public();

export default Register;
