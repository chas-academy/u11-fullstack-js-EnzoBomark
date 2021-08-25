import { S } from './ForgotPassword.style';
import ForgotPasswordForm from '../../components/auth/ForgotPassword';

const ForgotPassword = () => {
  return (
    <S.ForgotPassword>
      <S.H1>Forgot Email</S.H1>
      <S.H2>Please fill in the details and confirm the mail</S.H2>
      <ForgotPasswordForm />
    </S.ForgotPassword>
  );
};

export default ForgotPassword;
