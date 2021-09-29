import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

const Saved: NextPage = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return <div>Saved</div>;
};

import { Private } from '@/guards/private.guard';
export const getServerSideProps = Private();

export default Saved;
