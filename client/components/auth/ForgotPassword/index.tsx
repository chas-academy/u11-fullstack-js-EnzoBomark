import { S } from './ForgotPassword.style';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ForgotPasswordSchema, Props } from '@/schemas/ForgorPassword.schema';
import { FormResponse } from '@/interfaces/FormResponse.interface';
import { resolver } from '@/utils/form/resolver.utils';
import { post } from '@/utils/rest/http.utils';
import Form from '@/components/shared/forms/Form';
import Submit from '@/components/shared/buttons/Submit';
import VerifiedInput from '@/components/shared/inputs/VerifiedInput';

const ForgotPasswordForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = resolver<Props>(ForgotPasswordSchema);

  const formValues = async (values) => {
    const response = await post<FormResponse>('auth/forgot-password', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    return setSuccess(response.parsedBody.success);
  };

  const emailError = errors.email?.message;

  return (
    <Form submitHandler={handleSubmit(formValues)} error={error} success={success}>
      <VerifiedInput format="email" error={emailError} register={register('email')} />
      <Submit>Login</Submit>
    </Form>
  );
};

export default ForgotPasswordForm;
