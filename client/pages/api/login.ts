// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthResponse } from '@/interfaces/AuthResponse.interface';
import { post } from '@/utils/rest/http.utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;

  try {
    const response = await post<AuthResponse>('auth/login', body, { headers });

    res.send(response); // Send data from Node.js server response
  } catch ({ response: { status, data } }) {
    // Send status (probably 401) so the axios interceptor can run.
    res.status(status).json(data);
  }
};
