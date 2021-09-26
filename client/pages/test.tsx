import { NextPage } from 'next';

const Test: NextPage<{ data: string }> = ({ data }) => {
  console.log(data);

  return <div>{data}</div>;
};

import { auth } from '@/guards/auth.guard';
import { get } from '@/utils/http.utils';
import { Response } from '@/interfaces/AuthResponse.interface';
export const getServerSideProps = auth(async (context) => {
  const { req } = context;

  const { access_token, refresh_token } = req.cookies;

  const response = await get<Response>('auth/user', {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: access_token,
    'x-refresh': refresh_token,
  });

  if (!response.ok) {
    return {
      props: {
        data: `${access_token} ${refresh_token}`,
      },
    };
  }

  if (response.ok) {
    const { _id, name, email } = response.parsedBody.success;

    return {
      props: {
        data: `${_id} ${name}`,
      },
    };
  }
}, false);

export default Test;
