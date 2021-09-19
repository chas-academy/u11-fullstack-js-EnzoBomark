import { GetServerSideProps, NextPage } from 'next';
import { Response } from '@/interfaces/AuthResponse.interface';
import { get } from '@/utils/rest/http.utils';
import { wrapper } from '../store';
import { addUser } from 'slices/user.slice';

export const auth = (gssp: GetServerSideProps, secure = false) => {
  //@ts-ignore
  return wrapper.getServerSideProps((store) => async (context) => {
    const { req } = context;

    const { access_token, refresh_token } = req.cookies;

    const response = await get<Response>('auth/user', {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: access_token,
      'x-refresh': refresh_token,
    });

    if (!response.ok && secure) {
      return {
        redirect: {
          destination: '/login',
        },
      };
    }

    if (response.ok) {
      const { _id, name, email } = response.parsedBody.success;

      store.dispatch(addUser({ id: _id, name, email }));
    }

    return await gssp(context);
  });
};
