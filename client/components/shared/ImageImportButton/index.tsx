import { S } from './ImageImportButton.style';
import React, { useState } from 'react';
import { GET } from '@/helpers/Rest.helper';
import { s3UploadWithCompression } from '@/utils/s3.utils';

const ImageImportButton = React.forwardRef<HTMLInputElement>((props, ref) => {
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files[0];
    const imageUrl = await s3UploadWithCompression(selectedImage);

    console.log(imageUrl);

    if (selectedImage) {
      setIsImageSelected(true);
    }
  };

  return (
    <>
      <S.ImageImportButton
        type="file"
        id="upload"
        accept="image/*"
        hidden
        ref={ref}
        onChange={handleChange}
      />

      <S.Label htmlFor="upload">
        {isImageSelected && <S.Active>Image</S.Active>}
        {!isImageSelected && <S.Inactive>Image</S.Inactive>}
      </S.Label>
    </>
  );
});

export default ImageImportButton;
