import { S } from './ImageImport.style';
import { s3UploadWithCompression } from '@/utils/rest/s3.utils';
import { useState } from 'react';

const ImageImport = () => {
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
      <S.ImageImport type="file" id="upload" accept="image/*" hidden onChange={handleChange} />

      <S.Label htmlFor="upload" active={isImageSelected}>
        Image
      </S.Label>
    </>
  );
};

export default ImageImport;
