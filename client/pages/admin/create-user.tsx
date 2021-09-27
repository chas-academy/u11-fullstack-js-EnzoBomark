import AdminCreateUserForm from '@/components/admin/AdminCreateUser';
import React from 'react';

const createUser = () => {
  return (
    <div>
      <AdminCreateUserForm />
    </div>
  );
};

import { admin } from '@/guards/admin.guard';
export const getServerSideProps = admin(async (context) => {
  return null;
});

export default createUser;
