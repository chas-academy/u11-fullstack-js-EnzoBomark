import { HttpResponse } from '@/interfaces/HttpResponse.interface';
import { getCookie } from '../cookies/cookie.utils';

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
  res = null,
  args: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken', res),
      'x-refresh': getCookie('refreshToken', res),
    },
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const post = async <T>(
  path: string,
  body: any,
  res = null,
  args: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken', res),
      'x-refresh': getCookie('refreshToken', res),
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const put = async <T>(
  path: string,
  body: any,
  res = null,
  args: RequestInit = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken', res),
      'x-refresh': getCookie('refreshToken', res),
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const destroy = () => {};
