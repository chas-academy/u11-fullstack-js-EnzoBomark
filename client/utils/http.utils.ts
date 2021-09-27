import { HttpResponse } from '@/interfaces/HttpResponse.interface';
import Cookies from 'js-cookie';

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
  extraHeaders: { [key: string]: string } = {
    authorization: Cookies.get('access_token'),
    'x-refresh': Cookies.get('refresh_token'),
  },
  args: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const post = async <T>(
  path: string,
  body: any,
  extraHeaders: { [key: string]: string } = {
    authorization: Cookies.get('access_token'),
    'x-refresh': Cookies.get('refresh_token'),
  },
  args: RequestInit = {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const put = async <T>(
  path: string,
  body: any,
  extraHeaders: { [key: string]: string } = {
    authorization: Cookies.get('access_token'),
    'x-refresh': Cookies.get('refresh_token'),
  },
  args: RequestInit = {
    credentials: 'include',
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const destroy = async <T>(
  path: string,
  body: any,
  extraHeaders: { [key: string]: string } = {
    authorization: Cookies.get('access_token'),
    'x-refresh': Cookies.get('refresh_token'),
  },
  args: RequestInit = {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};
