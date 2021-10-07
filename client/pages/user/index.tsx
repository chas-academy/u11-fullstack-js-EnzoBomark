import { NextPage } from 'next';
import { useSelector } from 'react-redux';

import Redirect from '@/components/shared/links/Redirect';
import { Private } from '@/guards/private.guard';
import { RootState } from '@/store/index';
import { S } from '@/styles/pages/user/User.style';

const User: NextPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <S.User>
      <S.H1>{user.name}</S.H1>
      <Redirect href={`/user/articles`}>My Articles</Redirect>
      <Redirect href={`/user/update`}>Update User</Redirect>
      <Redirect href={`/user/logout`}>Logout User</Redirect>
      <Redirect href={`/user/delete`}>Delete User</Redirect>
    </S.User>
  );
};

export const getServerSideProps = Private();

export default User;
