import Cookies from 'js-cookie';
import { useState } from 'react';

import { IUser, UsersResponse } from '@/interfaces/User.interface';
import { post } from '@/utils/http.utils';

import useFetchDebounce from './useFetchDebounce.hooks';
import useMount from './useMount';

const useUserSearch = (query: string, page: number, ssrLoadedData: IUser[]) => {
  const [users, setUsers] = useState(ssrLoadedData);

  const { isLoading, hasError, data } = useFetchDebounce<UsersResponse>(
    () =>
      post(
        'admin/users',
        { query, page },
        {
          authorization: Cookies.get('access_token'),
          'x-refresh': Cookies.get('refresh_token'),
        }
      ),
    [query, page],
    500
  );

  useMount(() => {
    setUsers([]);
  }, [query]);

  useMount(() => {
    setUsers((prevData) => {
      return [...new Set([...prevData, ...data.success])];
    });
  }, [data]);

  return { isLoading, hasError, users };
};

export default useUserSearch;
