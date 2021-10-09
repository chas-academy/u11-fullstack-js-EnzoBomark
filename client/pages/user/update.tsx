import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Text from '@/components/shared/inputs/Text/Index';
import Spinner from '@/components/shared/misc/Spinner';
import Form from '@/components/shared/templates/Form';
import { Private } from '@/guards/private.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import { Response } from '@/interfaces/Response.interface';
import {
    Props,
    UpdateUserSchema
} from '@/schemas/UpdateUser.schema';
import { RootState } from '@/store/index';
import { S } from '@/styles/pages/user/Update.style';
import { put } from '@/utils/http.utils';
import { resolver } from '@/utils/resolver.utils';

const UpdateUser: NextPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const res = resolver<Props>(UpdateUserSchema);
  const [values, setValues] = useState<Props>();

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    put(`user/update-creds`, values)
  );

  useMount(async () => await fetch(), [values]);

  return (
    <S.Update>
      <Spinner isLoading={isLoading} />
      <S.H1>{user.name}</S.H1>

      <Form
        onSubmit={res.handleSubmit((e) => setValues(e))}
        error={hasError}
        success={data?.success}
      >
        <Text
          id="name"
          placeholder="Name"
          defaultValue={user.name}
          error={res.formState.errors.name?.message}
          register={res.register('name')}
        />
        <Text
          id="email"
          placeholder="Email"
          defaultValue={user.email}
          error={res.formState.errors.email?.message}
          register={res.register('email')}
        />
        <S.Submit>Update User</S.Submit>
      </Form>
    </S.Update>
  );
};

export const getServerSideProps = Private();

export default UpdateUser;
