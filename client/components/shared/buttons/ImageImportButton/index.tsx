import { S } from './ImageImportButton.style';
import { s3UploadWithCompression } from '@/utils/rest/s3.utils';
import { useState } from 'react';

interface Props {
  id: string;
  getState: any;
}

const ImageImportButton: React.FC<Props> = (props: Props) => {
  const [isActive, setIsActive] = useState('');

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files[0];
    const imageKey = await s3UploadWithCompression(selectedImage);
    setIsActive(imageKey);
    props.getState(imageKey);
  };

  return (
    <S.Label htmlFor={props.id} active={isActive}>
      <S.ImageImportButton
        type="file"
        id={props.id}
        accept="image/*"
        hidden
        onChange={handleChange}
      />
      Image
    </S.Label>
  );
};

export default ImageImportButton;
