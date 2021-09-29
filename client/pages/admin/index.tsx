import { S } from '@/styles/pages/Admin.style';
import { NextPage } from 'next';
import { get } from '@/utils/http.utils';
import { Response } from '@/interfaces/Response.interface';
import { IUser } from '@/interfaces/User.interface';
import UserListItem from '@/components/admin/UserListItem';

const Admin: NextPage<{ data: { users: IUser[] } }> = ({ data }) => {
  return (
    <S.Admin>
      {data.users.map((item) => {
        return <UserListItem key={item._id} data={item} />;
      })}

      <Redirect href="/admin/create-user">Create User</Redirect>
    </S.Admin>
  );
};

import { admin } from '@/guards/admin.guard';
import Redirect from '@/components/shared/links/Redirect';
export const getServerSideProps = admin(async (context) => {
  const { req, res } = context;

  const { access_token, refresh_token } = req.cookies;

  const users = await get<Response>('admin/users', {
    authorization: access_token,
    'x-refresh': refresh_token,
  });

  if (!users.ok) {
    return { props: { data: { users: [] } } };
  }

  return { props: { data: { users: users.parsedBody.success } } };
});

export default Admin;
