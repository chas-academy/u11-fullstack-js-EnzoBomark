import { Props, ResetPasswordSchema } from '@/schemas/ResetPassword.schema';

import Form from '@/components/shared/templates/Form';
import { FormResponse } from '@/interfaces/FormResponse.interface';
import { NextPage } from 'next';
import Password from '@/components/shared/inputs/Password/Index';
import { Public } from '@/guards/public.guard';
import { S } from '@/styles/pages/ResetPassword.style';
import Spinner from '@/components/shared/misc/Spinner';
import { put } from '@/utils/http.utils';
import { resolver } from '@/utils/resolver.utils';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const res = resolver<Props>(ResetPasswordSchema);
  const [values, setValues] = useState<Props>();
  const { fetch, isLoading, hasError, data } = useFetch<FormResponse>(() =>
    put(`auth/reset-password/${router.query.resetToken}`, values)
  );

  useMount(async () => await fetch(), [values]);

  return (
    <S.ResetPassword>
      <Spinner isLoading={isLoading} />
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

export const getServerSideProps = Public();

export default ResetPassword;
