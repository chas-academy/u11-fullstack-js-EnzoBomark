import { S } from '@/styles/pages/ForgotPassword.style';
import { NextPage } from 'next';
import { useState } from 'react';
import { ForgotPasswordSchema, Props } from '@/schemas/ForgotPassword.schema';
import { FormResponse } from '@/interfaces/FormResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import Form from '@/components/shared/templates/Form';
import Submit from '@/components/shared/buttons/SubmitButton';
import Text from '@/components/shared/inputs/Text/Index';

const ForgotPassword: NextPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const res = resolver<Props>(ForgotPasswordSchema);

  const formValues = async (values) => {
    const response = await post<FormResponse>('auth/forgot-password', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    return setSuccess(response.parsedBody.success);
  };

  return (
    <S.ForgotPassword>
      <S.H1>Forgot Email</S.H1>
      <S.H2>Please fill in the details and confirm the mail</S.H2>
      <Form onSubmit={res.handleSubmit(formValues)} error={error} success={success}>
        <Text
          id="email"
          placeholder="Email"
          error={res.formState.errors.email?.message}
          register={res.register('email')}
        />
        <Submit>Login</Submit>
      </Form>
    </S.ForgotPassword>
  );
};

export default ForgotPassword;
