import { S } from './Register.style';
import { useState } from 'react';
import router from 'next/router';
import { RegisterSchema, Props } from '@/schemas/Register.schema';
import { Response } from '@/interfaces/AuthResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import Form from '@/components/shared/forms/Form';
import Submit from '@/components/shared/buttons/SubmitButton';
import VerifiedInput from '@/components/shared/inputs/VerifiedInput';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = resolver<Props>(RegisterSchema);

  const formValues = async (values: Props) => {
    const response = await post<Response>('auth/register', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    localStorage.setItem('user', JSON.stringify(response.parsedBody));
    router.push('/login');
  };

  const nameError = errors.name?.message;
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const passwordConfError = errors.passwordConf?.message;

  return (
    <Form submitHandler={handleSubmit(formValues)} error={error}>
      <VerifiedInput format="name" error={nameError} register={register('name')} />
      <VerifiedInput format="email" error={emailError} register={register('email')} />
      <VerifiedInput
        type="password"
        format="password"
        error={passwordError}
        register={register('password')}
      />
      <VerifiedInput
        type="password"
        format="confirmation"
        error={passwordConfError}
        register={register('passwordConf')}
      />
      <Submit>Register</Submit>
    </Form>
  );
};

export default RegisterForm;
