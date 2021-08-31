import { HttpResponse } from '@/interfaces/HttpResponse.interface';
import { http } from '@/utils/http.utils';

const API_BASE = 'http://localhost:5000/api/';

export const GET = async <T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const POST = async <T>(
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

export const PUT = async <T>(
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

export const DELETE = () => {};
