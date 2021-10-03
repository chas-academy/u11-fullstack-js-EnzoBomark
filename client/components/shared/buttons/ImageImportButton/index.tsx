import Image from 'next/image';

import { Icon } from '@/assets/icons';

import { S } from './ImageImportButton.style';

interface Props {
  onChange: (e) => void;
  active: string;
}

const ImageImportButton: React.FC<Props> = (props: Props) => {
  return (
    <S.Label htmlFor="image-import" active={props.active}>
      <S.ImageImportButton
        type="file"
        id="image-import"
        accept="image/*"
        hidden
        onChange={(e) => props.onChange(e.target.files[0])}
      />
      <Image src={Icon.Image} />
    </S.Label>
  );
};

export default ImageImportButton;
