import { useCallback, useState } from 'react';
import Compress from 'react-image-file-resizer';

import { Response } from '@/interfaces/Response.interface';
import { get } from '@/utils/http.utils';

import { useMount } from './useMount';

export const useS3 = (image: File) => {
  const [secureUrl, setSecureUrl] = useState<string>(null);
  const [imageKey, setImageKey] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(null);
  const [hasError, setHasError] = useState<string>(null);

  const uploadImage = useCallback(async () => {
    setIsLoading(true);
    setHasError(null);
    const response = await get<Response>('secure/s3');

    if (!response.ok) setHasError(response.parsedBody.error);
    if (response.ok) setSecureUrl(response.parsedBody.success);
  }, [image]);

  useMount(() => {
    Compress.imageFileResizer(
      image,
      3840,
      2160,
      'JPEG',
      85,
      0,
      async (uri: Blob) => {
        await fetch(secureUrl, {
          method: 'PUT',
          headers: {
            'content-type': 'multipart/form-data',
          },
          body: uri,
        });

        setImageKey(secureUrl.split('?').shift().split('/').pop());
      },
      'blob'
    );
    setIsLoading(false);
  }, [secureUrl]);

  return { uploadImage, isLoading, hasError, imageKey };
};
