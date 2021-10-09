import { Cookies } from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { removeUser } from 'slices/user.slice';

import Spinner from '@/components/shared/misc/Spinner';
import Private from '@/guards/private.guard';
import useFetch from '@/hooks/useFetch.hooks';
import { Response } from '@/interfaces/Response.interface';
import { S } from '@/styles/pages/user/Logout.style';
import { destroy } from '@/utils/http.utils';

const Logout: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() => destroy(`user/logout`, {}));

  const logoutHandler = async () => {
    await fetch();
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    dispatch(removeUser());
    router.push('/');
  };

  return (
    <S.Logout>
      <Spinner isLoading={isLoading} />
      <S.H1>Logout</S.H1>
      <S.Submit onClick={logoutHandler}>Confirm</S.Submit>
    </S.Logout>
  );
};

export const getServerSideProps = Private();

export default Logout;
