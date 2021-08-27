const API_BASE = 'http://localhost:5000/api/';

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export const http = async <T>(request: RequestInfo): Promise<HttpResponse<T>> => {
  const response: HttpResponse<T> = await fetch(request);

  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (error) {
    console.log(error);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};

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
