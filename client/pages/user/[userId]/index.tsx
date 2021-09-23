import { auth } from '@/guards/auth.guard';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

const User: NextPage = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return <div>{user.id}</div>;
};

export const getServerSideProps = auth(async (context) => {
  return null;
}, true);

export default User;
