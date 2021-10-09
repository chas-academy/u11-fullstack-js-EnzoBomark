import { useCallback, useState } from 'react';

import { HttpResponse } from '@/interfaces/HttpResponse.interface';
import { Response } from '@/interfaces/Response.interface';

const useFetch = <T extends Response>(request: () => Promise<HttpResponse<T>>) => {
  const [data, setData] = useState<T>(null);
  const [isLoading, setIsLoading] = useState<boolean>(null);
  const [hasError, setHasError] = useState<string>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setHasError(null);
    const response: HttpResponse<T> = await request();

    if (!response.ok) setHasError(response.parsedBody.error);
    if (response.ok) setData(response.parsedBody);

    setIsLoading(false);
  }, [request]);

  return { fetch, isLoading, hasError, data };
};

export default useFetch;
