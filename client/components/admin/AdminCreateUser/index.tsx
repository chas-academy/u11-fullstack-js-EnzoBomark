import { S } from './AdminCreateUser.style';
import { useState } from 'react';
import router from 'next/router';
import { Response } from '@/interfaces/AuthResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import Form from '@/components/shared/forms/Form';
import Submit from '@/components/shared/buttons/SubmitButton';
import VerifiedInput from '@/components/shared/inputs/VerifiedInput';
import { AdminCreateUserSchema, Props } from '@/schemas/admin/createUser.schema';

const AdminCreateUserForm = () => {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = resolver<Props>(AdminCreateUserSchema);

  const formValues = async (values: Props) => {
    const response = await post<Response>('admin/user', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    router.push('/admin');
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
      <input type="checkbox" />
      <Submit>Register</Submit>
    </Form>
  );
};

export default AdminCreateUserForm;
