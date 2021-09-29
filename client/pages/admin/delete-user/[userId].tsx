import { Admin } from '@/guards/admin.guard';
import Form from '@/components/shared/templates/Form';
import { NextPage } from 'next';
import React from 'react';
import { Response } from '@/interfaces/Response.interface';
import { S } from '@/styles/pages/DeleteUser.style';
import Spinner from '@/components/shared/misc/Spinner';
import { destroy } from '@/utils/http.utils';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useRouter } from 'next/router';

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

export const getServerSideProps = Admin();

export default AdminEmailUser;
