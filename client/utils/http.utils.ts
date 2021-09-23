import { HttpResponse } from '@/interfaces/HttpResponse.interface';

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
  headers: { [key: string]: string } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  args: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: headers,
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const post = async <T>(
  path: string,
  body: any,
  headers: { [key: string]: string } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  args: RequestInit = {
    credentials: 'include',
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const put = async <T>(
  path: string,
  body: any,
  headers: { [key: string]: string } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  args: RequestInit = {
    credentials: 'include',
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const destroy = async <T>(
  path: string,
  body?: any,
  headers: { [key: string]: string } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  args: RequestInit = {
    credentials: 'include',
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};
