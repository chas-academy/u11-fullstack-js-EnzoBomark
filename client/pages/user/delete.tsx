import { Cookies } from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { removeUser } from 'slices/user.slice';

import Spinner from '@/components/shared/misc/Spinner';
import { Private } from '@/guards/private.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { Response } from '@/interfaces/Response.interface';
import { S } from '@/styles/pages/user/Delete.style';
import { destroy } from '@/utils/http.utils';

const Delete: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() => destroy(`user/delete`, {}));

  const logoutHandler = async () => {
    await fetch();
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    dispatch(removeUser());
    router.push('/');
  };

  return (
    <S.Delete>
      <Spinner isLoading={isLoading} />
      <S.H1>Delete your account forever</S.H1>
      <S.H2>You are always welcome back</S.H2>

      <S.Submit onClick={logoutHandler}>Confirm</S.Submit>
    </S.Delete>
  );
};

export const getServerSideProps = Private();

export default Delete;
