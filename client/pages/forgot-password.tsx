import { NextPage } from 'next';
import { useState } from 'react';

import Text from '@/components/shared/inputs/Text/Index';
import Spinner from '@/components/shared/misc/Spinner';
import Form from '@/components/shared/templates/Form';
import Public from '@/guards/public.guard';
import useFetch from '@/hooks/useFetch.hooks';
import useMount from '@/hooks/useMount';
import { FormResponse } from '@/interfaces/FormResponse.interface';
import { ForgotPasswordSchema, Props } from '@/schemas/ForgotPassword.schema';
import { S } from '@/styles/pages/ForgotPassword.style';
import { post } from '@/utils/http.utils';
import resolver from '@/utils/resolver.utils';

const ForgotPassword: NextPage = () => {
  const res = resolver<Props>(ForgotPasswordSchema);
  const [values, setValues] = useState<Props>();
  const { fetch, isLoading, hasError, data } = useFetch<FormResponse>(() =>
    post('user/forgot-password', values)
  );

  useMount(async () => await fetch(), [values]);

  return (
    <S.ForgotPassword>
      <Spinner isLoading={isLoading} />
      <S.H1>Forgot Email</S.H1>
      <S.H2>Please fill in the details and confirm the mail</S.H2>
      <Form
        onSubmit={res.handleSubmit((e) => setValues(e))}
        error={hasError}
        success={data?.success}
      >
        <Text
          id="email"
          placeholder="Email"
          error={res.formState.errors.email?.message}
          register={res.register('email')}
        />
        <S.Submit>Login</S.Submit>
      </Form>
    </S.ForgotPassword>
  );
};

export const getServerSideProps = Public();

export default ForgotPassword;
