import { S } from './ForgotPassword.style';
import { useForm } from 'react-hook-form';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { POST } from '@/utils/rest/http.utils';
import Link from 'next/link';
import Form from '@/components/shared/forms/Form';
import Input from '@/components/shared/inputs/Input';
import Submit from '@/components/shared/buttons/Submit';

const schema = object({
  email: string().email('Email must be a valid email address').required('Email is required'),
});

type Props = InferType<typeof schema>;

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  const formSubmitHandler = async (values: Props) => {
    const response = await POST('auth/forgot-password', values);

    console.log(response);
  };

  const emailError = errors?.email?.message;

  return (
    <Form submitHandler={handleSubmit(formSubmitHandler)}>
      <Input format="email" error={emailError} register={register('email')} />
      <Submit>Login</Submit>
    </Form>
  );
};

export default ForgotPasswordForm;
