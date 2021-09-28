import { useState } from 'react';
import { HttpResponse } from '@/interfaces/HttpResponse.interface';
import { Response } from '@/interfaces/Response.interface';
import { useDebounce } from './useDebounce.hooks';
import { useMount } from './useMount';

export const useFetchDebounce = <T extends Response>(
  request: () => Promise<HttpResponse<T>>,
  args: any[],
  debounceTime: number = 0
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<string>(null);

  useMount(() => {
    setIsLoading(true);
  }, [...args]);

  useDebounce(
    () => {
      const fetchData = async () => {
        setHasError('');

        const response: HttpResponse<T> = await request();

        if (!response.ok) {
          setHasError(response.parsedBody.error);
        }

        setData(response.parsedBody);
        setIsLoading(false);
      };
      fetchData();
    },
    debounceTime,
    [...args]
  );

  return { isLoading, hasError, data };
};
