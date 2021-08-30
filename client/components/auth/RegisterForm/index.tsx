import { S } from './Register.style';
import { useForm } from 'react-hook-form';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { POST } from '@/helpers/Rest.helper';

const schema = object({
  name: string().required('Name is required'),
  email: string().email('Email must be a valid email address').required('Email is required'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
});

const formSubmitHandler = async (values: Props) => {
  const response = await POST('auth/register', values);

  console.log(response);
};

type Props = InferType<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  const nameError = errors?.name?.message,
    emailError = errors?.email?.message,
    passwordError = errors?.password?.message,
    passwordConfError = errors?.passwordConfirmation?.message;

  return (
    <S.Form onSubmit={handleSubmit(formSubmitHandler)}>
      <S.Label htmlFor="name">Name</S.Label>
      <S.Input
        className={nameError && 'error'}
        placeholder="Name"
        id="name"
        {...register('name')}
      />
      {nameError && <S.Error>{nameError}</S.Error>}

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
      {passwordError && <S.Error>{passwordError}</S.Error>}

      <S.Label htmlFor="password-confirmation">Password confirmation</S.Label>
      <S.Input
        className={passwordConfError && 'error'}
        type="password"
        placeholder="Password Confirmation"
        id="password-onfirmation"
        {...register('passwordConfirmation')}
      />
      {passwordConfError && <S.Error>{passwordConfError}</S.Error>}
      <S.Submit>Register</S.Submit>
    </S.Form>
  );
};

export default RegisterForm;
