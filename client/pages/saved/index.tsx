import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

const Saved: NextPage = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return <div>Saved</div>;
};

import { auth } from '@/guards/auth.guard';

export const getServerSideProps = auth(async (context) => {
  return null;
}, true);
export default Saved;
