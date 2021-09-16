import { HttpResponse } from '@/interfaces/HttpResponse.interface';
import { getStorage } from '../storage/localStorage.utils';

const API_BASE = process.env.BASE_API;

export const http = async <T>(request: RequestInfo): Promise<HttpResponse<T>> => {
  const response: HttpResponse<T> = await fetch(request);

  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (error) {
    console.log(error);
  }

  return response;
};

export const get = async <T>(
  path: string,
  args: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: getStorage('accessToken'),
      'x-refresh': getStorage('refreshToken'),
    },
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const post = async <T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: getStorage('accessToken'),
      'x-refresh': getStorage('refreshToken'),
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const put = async <T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: getStorage('accessToken'),
      'x-refresh': getStorage('refreshToken'),
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const destroy = () => {};
