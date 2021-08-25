import { S } from './ForgotPassword.style';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { POST } from '../../../helpers/Rest.helper';

const schema = object({
  email: string().email('Email must be a valid email address').required('Email is required'),
});

const formSubmitHandler = async (values: Props) => {
  const response = await POST('auth/forgot-password', values);

  console.log(response);
};

type Props = InferType<typeof schema>;

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  const emailError = errors?.email?.message;

  return (
    <>
      <S.Form onSubmit={handleSubmit(formSubmitHandler)}>
        <S.Label htmlFor="email">Email</S.Label>
        <S.Input
          className={emailError && 'error'}
          placeholder="jane.doe@email.com"
          id="email"
          {...register('email')}
        />
        {emailError && <S.Error>{emailError}</S.Error>}
        <S.Submit>Send Email</S.Submit>
      </S.Form>
    </>
  );
};

export default ForgotPasswordForm;
