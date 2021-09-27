import { S } from '@/styles/pages/ResetPassword.style';
import { NextPage } from 'next';
import { useState } from 'react';
import { ResetPasswordSchema, Props } from '@/schemas/ResetPassword.schema';
import { FormResponse } from '@/interfaces/FormResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import Form from '@/components/shared/templates/Form';
import Submit from '@/components/shared/buttons/SubmitButton';
import Password from '@/components/shared/inputs/Password/Index';

const ResetPassword: NextPage = () => {
  const res = resolver<Props>(ResetPasswordSchema);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const formValues = async (values: Props) => {
    const response = await post<FormResponse>('auth/reset-password', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    return setSuccess(response.parsedBody.success);
  };
  return (
    <S.ResetPassword>
      <S.H1>Reset Password</S.H1>
      <S.H2>Please fill in the details and reset your password</S.H2>

      <Form onSubmit={res.handleSubmit(formValues)} error={error} success={success}>
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
        <Submit>Login</Submit>
      </Form>
    </S.ResetPassword>
  );
};

export default ResetPassword;
