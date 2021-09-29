import { S } from '@/styles/pages/Admin.style';
import { useState } from 'react';
import { NextPage } from 'next';
import { post } from '@/utils/http.utils';
import { IPaginatedUsers, UsersResponse } from '@/interfaces/User.interface';
import UserListItem from '@/components/admin/UserListItem';
import Redirect from '@/components/shared/links/Redirect';
import { useObserver } from '@/hooks/useObserver.hooks';
import { useUserSearch } from '@/hooks/useUserSearch.hooks';
import Spinner from '@/components/shared/misc/Spinner';

const AdminPanel: NextPage<{ data: IPaginatedUsers }> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');

  const { isLoading, hasError, users } = useUserSearch(query, pageNumber, data);

  const { lastElemRef } = useObserver(() => setPageNumber((prevPageNumber) => ++prevPageNumber));

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <S.Admin>
      <S.Searchbar placeholder="Search users" value={query} onChange={handleSearch} />

      {users.map((item, index, { length }) => {
        return ++index !== length ? (
          <UserListItem data={item} key={item._id} />
        ) : (
          <UserListItem ref={lastElemRef} key={item._id} data={item} />
        );
      })}

      {!users.length && !isLoading && <div>No match</div>}

      <Redirect href="/admin/create-user">Create User</Redirect>

      {hasError && <div>{hasError}</div>}
      {isLoading && <Spinner />}
    </S.Admin>
  );
};

import { Admin } from '@/guards/admin.guard';
export const getServerSideProps = Admin(async (context) => {
  const { req, res } = context;

  const { access_token, refresh_token } = req.cookies;

  const response = await post<UsersResponse>(
    'admin/users',
    { query: '', page: 1 },
    {
      authorization: access_token,
      'x-refresh': refresh_token,
    }
  );

  if (!response.ok) {
    return { props: { data: 'error' } };
  }

  console.log(response);

  return { props: { data: response.parsedBody.success } };
});

export default AdminPanel;
