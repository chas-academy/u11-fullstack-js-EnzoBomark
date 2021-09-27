import React from 'react';

const crudUser = () => {
  return <div>create user</div>;
};

import { admin } from '@/guards/admin.guard';
export const getServerSideProps = admin(async (context) => {
  return null;
});

export default crudUser;
