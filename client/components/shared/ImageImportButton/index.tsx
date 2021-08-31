import { S } from './ImageImportButton.style';
import { useRef, useState } from 'react';

const ImageImportButton = () => {
  const hiddenFileInput = useRef(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files[0];

    if (fileUploaded) {
      setIsImageSelected(true);
    }
  };

  return (
    <>
      <S.ImageImportButton
        type="file"
        id="upload"
        hidden
        ref={hiddenFileInput}
        onChange={handleChange}
      />

      <S.Label htmlFor="upload">
        {isImageSelected && <S.Active>Image</S.Active>}
        {!isImageSelected && <S.Inactive>Image</S.Inactive>}
      </S.Label>
    </>
  );
};

export default ImageImportButton;
