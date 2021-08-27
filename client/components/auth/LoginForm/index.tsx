import { S } from './Login.style';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { POST } from '@/helpers/Rest.helper';

const schema = object({
  email: string().email('Email must be a valid email address').required('Email is required'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

const formSubmitHandler = async (values: Props) => {
  const response = await POST('auth/login', values);

  console.log(response);
};

type Props = InferType<typeof schema>;

const LoginFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  const emailError = errors?.email?.message,
    passwordError = errors?.password?.message;

  return (
    <>
      <S.Form onSubmit={handleSubmit(formSubmitHandler)}>
        <S.Label htmlFor="email">Email</S.Label>
        <S.Input
          className={emailError && 'error'}
          placeholder="Email"
          id="email"
          {...register('email')}
        />
        {emailError && <S.Error>{emailError}</S.Error>}

        <S.Label htmlFor="password">Password</S.Label>
        <S.Input
          className={passwordError && 'error'}
          type="password"
          placeholder="Password"
          id="password"
          {...register('password')}
        />
        <S.P>
          <Link href="/forgot-password">
            <S.A>Forgot password?</S.A>
          </Link>
        </S.P>
        {passwordError && <S.Error>{passwordError}</S.Error>}
        <S.Submit>Login</S.Submit>
      </S.Form>
    </>
  );
};

export default LoginFrom;
