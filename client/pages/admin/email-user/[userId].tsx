import { S } from '@/styles/pages/EmailUser.style';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { Response } from '@/interfaces/Response.interface';
import { post } from '@/utils/http.utils';
import { useFetch } from '@/hooks/useFetch.hooks';
import router from 'next/router';
import Form from '@/components/shared/templates/Form';
import Text from '@/components/shared/inputs/Text/Index';
import TextArea from '@/components/shared/inputs/TextArea';

const AdminEmailUser: NextPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    post(`admin/user/${router.query.userId}/email`, { title, body })
  );

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch();
  };

  return (
    <S.EmailUser>
      <Spinner isLoading={isLoading} />
      <S.H1>Compose Email</S.H1>
      <Form onSubmit={submitHandler} error={hasError} success={data?.success}>
        <Text id="title" placeholder="Title" onChange={(e) => setTitle(e)} />
        <TextArea id="body" placeholder="Body" onChange={(e) => setBody(e)} />
        <S.Submit>Send Email</S.Submit>
      </Form>
    </S.EmailUser>
  );
};

import { Admin } from '@/guards/admin.guard';
import Spinner from '@/components/shared/misc/Spinner';
export const getServerSideProps = Admin();

export default AdminEmailUser;
