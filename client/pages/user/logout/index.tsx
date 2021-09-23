import { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { removeUser } from 'slices/user.slice';
import { useRouter } from 'next/router';

const Logout: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = async () => {
    const response = await destroy('auth/logout');

    if (!response.ok) {
      return console.log('error');
    }

    dispatch(removeUser());
    router.push('/');
  };

  return (
    <div>
      <button onClick={logoutHandler}>Confirm logout</button>
    </div>
  );
};

import { auth } from '@/guards/auth.guard';
import { destroy } from '@/utils/http.utils';
export const getServerSideProps = auth(async (context) => {
  return null;
}, true);

export default Logout;

// app.delete(
//   '/api/auth/logout',
//   MW.requireUser,
//   CONT.invalidateUserSessionHandler
// );
