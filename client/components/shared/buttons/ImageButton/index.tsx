import { S } from './ImageButton.style';
import { useSlateStatic } from 'slate-react';
import { insertImage } from '@/utils/slate/image.utils';
import { Icon } from '@/assets/icons';
import Image from 'next/image';

const ImageButton = () => {
  const editor = useSlateStatic();

  const insertImageHander = () => {
    const url = prompt('Enter an Image URL');
    insertImage(editor, url);
  };

  return (
    <S.ImageButton onClick={insertImageHander} aria-label="Insert Image" title="image">
      <Image src={Icon.Image} />
    </S.ImageButton>
  );
};

export default ImageButton;
