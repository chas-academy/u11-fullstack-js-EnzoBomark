import React from 'react';
import Link from 'next/link';

const Admin = () => {
  return <Link href="admin/crud-user">crud user</Link>;
};

import { admin } from '@/guards/admin.guard';
export const getServerSideProps = admin(async (context) => {
  return null;
});

export default Admin;
