import { S } from '@/styles/pages/DeleteUser.style';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { Response } from '@/interfaces/Response.interface';
import { destroy } from '@/utils/http.utils';
import router from 'next/router';
import Form from '@/components/shared/templates/Form';
import { useFetch } from '@/hooks/useFetch.hooks';

const AdminEmailUser: NextPage = () => {
  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    destroy(`admin/user/${router.query.userId}`, {})
  );

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch();
  };

  return (
    <S.DeleteUser>
      <S.H1>Delete {router.query.userId}</S.H1>
      <Form onSubmit={submitHandler} error={hasError} success={data?.success}>
        <S.Submit>Confirm</S.Submit>
      </Form>
    </S.DeleteUser>
  );
};

import { admin } from '@/guards/admin.guard';
export const getServerSideProps = admin();

export default AdminEmailUser;