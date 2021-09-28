import { S } from '@/styles/pages/ForgotPassword.style';
import { NextPage } from 'next';
import { useState } from 'react';
import { ForgotPasswordSchema, Props } from '@/schemas/ForgotPassword.schema';
import { FormResponse } from '@/interfaces/FormResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import Form from '@/components/shared/templates/Form';
import Text from '@/components/shared/inputs/Text/Index';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';

const ForgotPassword: NextPage = () => {
  const res = resolver<Props>(ForgotPasswordSchema);
  const [values, setValues] = useState<Props>();
  const { fetch, isLoading, hasError, data } = useFetch<FormResponse>(() =>
    post('auth/forgot-password', values)
  );

  useMount(async () => await fetch(), [values]);

  return (
    <S.ForgotPassword>
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

export default ForgotPassword;
