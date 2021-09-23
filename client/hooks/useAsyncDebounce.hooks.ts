import { useState } from 'react';
import { HttpResponse } from '@/interfaces/HttpResponse.interface';
import { Response } from '@/interfaces/AuthResponse.interface';
import { useDebounce } from './useDebounce.hooks';
import { useDidMountEffect } from './useDidMountEffect.hooks';

export const useAsyncDebounce = <T extends Response>(
  FeatchFn: () => Promise<HttpResponse<T>>,
  args: any[],
  debounceTime: number = 0
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');

  useDidMountEffect(() => {
    setIsLoading(true);
  }, [...args]);

  useDebounce(
    () => {
      const fetchData = async () => {
        setHasError('');

        const response: HttpResponse<T> = await FeatchFn();

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
