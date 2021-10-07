import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Checkbox from '@/components/shared/inputs/Checkbox';
import Password from '@/components/shared/inputs/Password/Index';
import Text from '@/components/shared/inputs/Text/Index';
import Spinner from '@/components/shared/misc/Spinner';
import Form from '@/components/shared/templates/Form';
import { Admin } from '@/guards/admin.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import { useToggle } from '@/hooks/useToggle.hooks';
import { Response } from '@/interfaces/Response.interface';
import { AdminCreateUserSchema, Props } from '@/schemas/AdminCreateUser.schema';
import { S } from '@/styles/pages/admin/CreateUser.style';
import { post } from '@/utils/http.utils';
import { resolver } from '@/utils/resolver.utils';

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
      <Spinner isLoading={isLoading} />
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

export const getServerSideProps = Admin();

export default AdminCreateUser;
