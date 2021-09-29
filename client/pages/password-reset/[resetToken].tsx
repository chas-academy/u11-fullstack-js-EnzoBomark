import { S } from '@/styles/pages/ResetPassword.style';
import { NextPage } from 'next';
import { useState } from 'react';
import { ResetPasswordSchema, Props } from '@/schemas/ResetPassword.schema';
import { FormResponse } from '@/interfaces/FormResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { put } from '@/utils/http.utils';
import Form from '@/components/shared/templates/Form';
import Password from '@/components/shared/inputs/Password/Index';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import router from 'next/router';

const ResetPassword: NextPage = () => {
  const res = resolver<Props>(ResetPasswordSchema);
  const [values, setValues] = useState<Props>();
  const { fetch, isLoading, hasError, data } = useFetch<FormResponse>(() =>
    put(`auth/reset-password/${router.query.resetToken}`, values)
  );

  useMount(async () => await fetch(), [values]);

  return (
    <S.ResetPassword>
      <S.H1>Reset Password</S.H1>
      <S.H2>Please fill in the details and reset your password</S.H2>

      <Form
        onSubmit={res.handleSubmit((e) => setValues(e))}
        error={hasError}
        success={data?.success}
      >
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
        <S.Submit>Login</S.Submit>
      </Form>
    </S.ResetPassword>
  );
};

import { auth } from '@/guards/auth.guard';
export const getServerSideProps = auth(async (context) => {
  return null;
}, false);

export default ResetPassword;
