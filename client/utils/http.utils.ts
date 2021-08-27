import { HttpResponse } from '@/interfaces/HttpResponse.interface';

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
