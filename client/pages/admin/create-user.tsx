import { S } from '@/styles/pages/UpdateUser.style';
import { NextPage } from 'next';
import { useState } from 'react';
import { Response } from '@/interfaces/Response.interface';
import { AdminCreateUserSchema, Props } from '@/schemas/admin/CreateUser.schema';
import { resolver } from '@/utils/resolver.utils';
import { post } from '@/utils/http.utils';
import { useRouter } from 'next/router';
import Form from '@/components/shared/templates/Form';
import Text from '@/components/shared/inputs/Text/Index';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import Checkbox from '@/components/shared/inputs/Checkbox';
import { useToggle } from '@/hooks/useToggle.hooks';
import Redirect from '@/components/shared/links/Redirect';

const AdminCreateUser: NextPage = () => {
  const router = useRouter();
  const res = resolver<Props>(AdminCreateUserSchema);
  const [values, setValues] = useState<Props>();
  const [role, setRole] = useToggle(false);

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    post('admin/user', { ...values, role: role ? 'admin' : '' })
  );

  useMount(async () => await fetch(), [values]);
  useMount(() => router.push('/admin'), [data]);

  return (
    <S.UpdateUser>
      <S.H1>Admin Create User</S.H1>
      <Form
        onSubmit={res.handleSubmit((e) => setValues(e))}
        error={hasError}
        success={data?.success}
      >
        <Text
          id="name"
          placeholder="Name"
          error={res.formState.errors.name?.message}
          register={res.register('name')}
        />
        <Text
          id="email"
          placeholder="Email"
          error={res.formState.errors.email?.message}
          register={res.register('email')}
        />
        <Password
          id="password"
          placeholder="Password"
          error={res.formState.errors.password?.message}
          register={res.register('password')}
        />
        <Password
          id="passwordConf"
          placeholder="Password Confirmation"
          error={res.formState.errors.passwordConf?.message}
          register={res.register('passwordConf')}
        />
        <Checkbox value={role} onClick={() => setRole()}>
          Admin
        </Checkbox>
        <S.Submit>Create User</S.Submit>
      </Form>
    </S.UpdateUser>
  );
};

import { admin } from '@/guards/admin.guard';
import Password from '@/components/shared/inputs/Password/Index';
export const getServerSideProps = admin();

export default AdminCreateUser;
