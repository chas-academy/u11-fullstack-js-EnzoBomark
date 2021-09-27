import { S } from '@/styles/pages/Register.style';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import router from 'next/router';
import { RegisterSchema, Props } from '@/schemas/Register.schema';
import { Response } from '@/interfaces/AuthResponse.interface';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import Form from '@/components/shared/templates/Form';
import Text from '@/components/shared/inputs/Text/Index';
import Submit from '@/components/shared/buttons/SubmitButton';
import Password from '@/components/shared/inputs/Password/Index';

const Register: NextPage = () => {
  const res = resolver<Props>(RegisterSchema);
  const [error, setError] = useState('');

  const formValues = async (values: Props) => {
    const response = await post<Response>('auth/register', values);

    if (!response.ok) {
      return setError(response.parsedBody.error);
    }

    router.push('/login');
  };

  return (
    <S.Register>
      <S.H1>Sign Up Now</S.H1>
      <S.H2>Please fill in the details and create an account</S.H2>
      <Form onSubmit={res.handleSubmit(formValues)} error={error}>
        <Text
          id="name"
          placeholder="Name"
          error={res.formState.errors.name?.message}
          register={res.register('name')}
        />
        <Text
          id="email"
          placeholder="Email"
          error={res.formState.errors.email?.message}
          register={res.register('email')}
        />
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
        <Submit>Register</Submit>
      </Form>
      <S.P>
        Already have an account?
        <Link href="/login">
          <S.A>Login</S.A>
        </Link>
      </S.P>
    </S.Register>
  );
};

export default Register;
