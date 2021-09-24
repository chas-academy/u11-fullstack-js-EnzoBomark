import { S } from '@/styles/pages/Login.style';
import Link from 'next/link';
import LoginFrom from '@/components/auth/LoginForm';
import { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <S.Login>
      <S.H1>Log In Now</S.H1>
      <S.H2>Please login to continue</S.H2>
      <LoginFrom />
      <S.P>
        Dont have an account?
        <Link href="/Register">
          <S.A>Register</S.A>
        </Link>
      </S.P>
    </S.Login>
  );
};

export default Login;