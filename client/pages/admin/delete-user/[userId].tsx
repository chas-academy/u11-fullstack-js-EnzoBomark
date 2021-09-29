import { S } from '@/styles/pages/DeleteUser.style';
import { NextPage } from 'next';
import React from 'react';
import { Response } from '@/interfaces/Response.interface';
import { destroy } from '@/utils/http.utils';
import { useRouter } from 'next/router';
import Form from '@/components/shared/templates/Form';
import { useFetch } from '@/hooks/useFetch.hooks';

const AdminEmailUser: NextPage = () => {
  const router = useRouter();
  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    destroy(`admin/user/${router.query.userId}`, {})
  );

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch();
    router.push('/admin');
  };

  return (
    <S.DeleteUser>
      <Spinner isLoading={isLoading} />
      <S.H1>Delete {router.query.userId}</S.H1>
      <Form onSubmit={submitHandler} error={hasError} success={data?.success}>
        <S.Submit>Confirm</S.Submit>
      </Form>
    </S.DeleteUser>
  );
};

import { Admin } from '@/guards/admin.guard';
import Spinner from '@/components/shared/misc/Spinner';
export const getServerSideProps = Admin();

export default AdminEmailUser;
