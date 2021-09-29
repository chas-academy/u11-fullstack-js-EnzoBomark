import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Checkbox from '@/components/shared/inputs/Checkbox';
import Text from '@/components/shared/inputs/Text/Index';
import Redirect from '@/components/shared/links/Redirect';
import Spinner from '@/components/shared/misc/Spinner';
import Form from '@/components/shared/templates/Form';
import { Admin } from '@/guards/admin.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import { useToggle } from '@/hooks/useToggle.hooks';
import { Response } from '@/interfaces/Response.interface';
import { IUser } from '@/interfaces/User.interface';
import { AdminUpdateUserSchema, Props } from '@/schemas/admin/UpdateUser.schema';
import { S } from '@/styles/pages/UpdateUser.style';
import { get, put } from '@/utils/http.utils';
import { resolver } from '@/utils/resolver.utils';

const AdminUpdateUser: NextPage<{ user: IUser }> = ({ user }) => {
  const router = useRouter();
  const res = resolver<Props>(AdminUpdateUserSchema);
  const [values, setValues] = useState<Props>();
  const [role, setRole] = useToggle(user.role === 'admin');

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    put(`admin/user/${router.query.userId}`, { ...values, role: role ? 'admin' : '' })
  );

  useMount(async () => await fetch(), [values]);

  return (
    <S.UpdateUser>
      <Spinner isLoading={isLoading} />
      <S.H1>Admin Update User</S.H1>
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
        <Checkbox value={role} onClick={() => setRole()}>
          Admin
        </Checkbox>
        <S.Submit>Update User</S.Submit>
      </Form>

      <Redirect href={`/admin/email-user/${router.query.userId}`}>Send Email</Redirect>
      <Redirect href={`/admin/delete-user/${router.query.userId}`}>Delete User</Redirect>
    </S.UpdateUser>
  );
};

export const getServerSideProps = Admin(async (context) => {
  const { req, res } = context;

  const { access_token, refresh_token } = req.cookies;

  const user = await get<Response>(`admin/user/${context.query.userId}`, {
    authorization: access_token,
    'x-refresh': refresh_token,
  });

  if (!user.ok) {
    return { props: { user: null } };
  }

  return { props: { user: user.parsedBody.success } };
});

export default AdminUpdateUser;
