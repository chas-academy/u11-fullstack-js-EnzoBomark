import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { removeUser } from 'slices/user.slice';
import { useRouter } from 'next/router';

const User: NextPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = () => {
    console.log('logout');
  };

  return (
    <div>
      {user.id} <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

import { Private } from '@/guards/private.guard';
export const getServerSideProps = Private();

export default User;
