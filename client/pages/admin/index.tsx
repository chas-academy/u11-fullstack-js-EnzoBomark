import { get } from '@/utils/http.utils';
import Link from 'next/link';
import { Response } from '@/interfaces/AuthResponse.interface';
import { NextPage } from 'next';
import { User } from '@/interfaces/Users.interface';

const Admin: NextPage<{ data: { users: User[] } }> = ({ data }) => {
  return (
    <>
      {data.users.map((item) => {
        return (
          <div key={item._id}>
            <div>{item.role}</div>
            <div>{item._id}</div>
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div>{item.password}</div>
            <div>{item.createdAt}</div>
            <div>{item.updatedAt}</div>
          </div>
        );
      })}

      <Link href="/admin/create-user">create user</Link>
    </>
  );
};

import { admin } from '@/guards/admin.guard';
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
