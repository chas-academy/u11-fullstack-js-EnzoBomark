import { useState } from 'react';
import { LoginSchema, Props } from '@/schemas/Login.schema';
import { resolver } from '@/utils/resolver.utils';
import Form from '@/components/shared/templates/Form';
import Submit from '@/components/shared/buttons/SubmitButton';
import Text from '@/components/shared/inputs/Text/Index';
import Password from '@/components/shared/inputs/Password/Index';

const Test = () => {
  const res = resolver<Props>(LoginSchema);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formValues = async () => {
    console.log({ email, password });
  };

  return (
    <Form onSubmit={res.handleSubmit(formValues)}>
      <Text
        id="email"
        placeholder="Email"
        error={res.formState.errors.email?.message}
        onChange={(value) => setEmail(value)}
        register={res.register('email')}
      />
      <Password
        id="password"
        placeholder="Password"
        error={res.formState.errors.password?.message}
        onChange={(value) => setPassword(value)}
        register={res.register('password')}
      />
      <Submit>Login</Submit>
    </Form>
  );
};

export default Test;
