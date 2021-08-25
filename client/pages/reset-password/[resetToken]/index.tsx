import { S } from './ResetPassword.style';
import ForgotPasswordForm from '../../../components/auth/ForgotPassword';

const ResetPassword = () => {
  return (
    <S.ResetPassword>
      <S.H1>Reset Password</S.H1>
      <S.H2>Please fill in the details and reset your passoword</S.H2>
      <ForgotPasswordForm />
    </S.ResetPassword>
  );
};

export default ResetPassword;
