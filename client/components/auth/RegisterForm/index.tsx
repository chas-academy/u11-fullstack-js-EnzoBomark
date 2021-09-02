import { S } from './Register.style';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { POST } from '@/utils/rest/http.utils';
import Link from 'next/link';
import Form from '@/components/shared/forms/Form';
import VerifiedInput from '@/components/shared/inputs/VerifiedInput';
import Submit from '@/components/shared/buttons/Submit';

const schema = object({
  name: string().required('Name is required'),
  email: string().email('Email must be a valid email address').required('Email is required'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConf: string()
    .required('Password confirmation is required')
    .oneOf([ref('password'), null], 'Passwords must match'),
});

type Props = InferType<typeof schema>;

const RegisterForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  const formSubmitHandler = async (values: Props) => {
    const response = await POST<{ accessToken: string; error: string }>('auth/register', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    localStorage.setItem('token', response.parsedBody.accessToken);
    router.push('/');
  };

  const nameError = errors.name?.message;
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const passwordConfError = errors.passwordConf?.message;

  return (
    <Form submitHandler={handleSubmit(formSubmitHandler)} error={error}>
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
      <Submit>Login</Submit>
    </Form>
  );
};

export default RegisterForm;
