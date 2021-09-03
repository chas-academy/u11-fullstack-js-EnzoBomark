import Compress from 'react-image-file-resizer';
import { get } from '@/utils/rest/http.utils';

export const s3UploadWithCompression = async (
  image: File,
  width = 3840,
  height = 2160,
  format = 'JPEG',
  compression = 85
) => {
  const response = await get<{ url: string }>('secure/s3');
  const secureUrl = response.parsedBody.url;
  const s3ObjectKey = secureUrl.split('?').shift().split('/').pop();

  Compress.imageFileResizer(
    image,
    width,
    height,
    format,
    compression,
    0,
    async (uri: Blob) =>
      await fetch(secureUrl, {
        method: 'PUT',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: uri,
      }),
    'blob'
  );

  return s3ObjectKey;
};
