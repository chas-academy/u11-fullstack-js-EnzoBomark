import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Text from '@/components/shared/inputs/Text/Index';
import TextArea from '@/components/shared/inputs/TextArea';
import Spinner from '@/components/shared/misc/Spinner';
import Form from '@/components/shared/templates/Form';
import Admin from '@/guards/admin.guard';
import useFetch from '@/hooks/useFetch.hooks';
import { Response } from '@/interfaces/Response.interface';
import { S } from '@/styles/pages/admin/EmailUser.style';
import { post } from '@/utils/http.utils';

const AdminEmailUser: NextPage = () => {
  const router = useRouter();
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

export const getServerSideProps = Admin();

export default AdminEmailUser;
