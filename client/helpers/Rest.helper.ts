import { HttpResponse } from '../interface/HttpResponse.interface';
import { http } from '../utils/http.utils';

const API_BASE = 'http://localhost:5000/api/';

export const GET = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'GET', body: JSON.stringify(body) }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const POST = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'POST', body: JSON.stringify(body) }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const PUT = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'PUT', body: JSON.stringify(body) }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const DELETE = () => {};
