import { S } from '@/styles/pages/ResetPassword.style';
import ForgotPasswordForm from '@/components/auth/ForgotPassword';
import { NextPage } from 'next';

const ResetPassword: NextPage = () => {
  return (
    <S.ResetPassword>
      <S.H1>Reset Password</S.H1>
      <S.H2>Please fill in the details and reset your passoword</S.H2>
      <ForgotPasswordForm />
    </S.ResetPassword>
  );
};

export default ResetPassword;
