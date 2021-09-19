import { S } from './ResetPassword.style';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ResetPasswordSchema, Props } from '@/schemas/ResetPassword.schema';
import { FormResponse } from '@/interfaces/FormResponse.interface';
import { resolver } from '@/utils/form/resolver.utils';
import { post } from '@/utils/rest/http.utils';
import Link from 'next/link';
import Form from '@/components/shared/forms/Form';
import Submit from '@/components/shared/buttons/Submit';
import VerifiedInput from '@/components/shared/inputs/VerifiedInput';

const ResetPasswordForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = resolver<Props>(ResetPasswordSchema);

  const formValues = async (values: Props) => {
    const response = await post<FormResponse>('auth/reset-password', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    return setSuccess(response.parsedBody.success);
  };

  const passwordError = errors.password?.message;
  const passwordConfError = errors.passwordConf?.message;

  return (
    <Form submitHandler={handleSubmit(formValues)} error={error} success={success}>
      <VerifiedInput format="password" error={passwordError} register={register('password')} />
      <VerifiedInput
        format="confirmation"
        error={passwordConfError}
        register={register('passwordConf')}
      />
      <Submit>Login</Submit>
    </Form>
  );
};

export default ResetPasswordForm;
