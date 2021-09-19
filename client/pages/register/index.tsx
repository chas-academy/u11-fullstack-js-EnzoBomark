import { S } from './Register.style';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';
import { NextPage } from 'next';

const Register: NextPage = () => {
  return (
    <S.Register>
      <S.H1>Sign Up Now</S.H1>
      <S.H2>Please fill in the details and create an account</S.H2>
      <RegisterForm />
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
