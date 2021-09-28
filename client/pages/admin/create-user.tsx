import React from 'react';

const createUser = () => {
  return <div></div>;
};

import { admin } from '@/guards/admin.guard';
export const getServerSideProps = admin(async (context) => {
  return null;
});

export default createUser;
