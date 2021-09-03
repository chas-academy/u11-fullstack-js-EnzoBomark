import { HttpResponse } from '@/interfaces/HttpResponse.interface';
const API_BASE = process.env.BASE_URL;

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
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(`${API_BASE}${path}`, args));
};

export const destroy = () => {};
