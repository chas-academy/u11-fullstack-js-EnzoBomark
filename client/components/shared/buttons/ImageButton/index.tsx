import Image from 'next/image';
import { useSlateStatic } from 'slate-react';

import { Icon } from '@/assets/icons';
import { insertImage } from '@/utils/image.utils';

import { S } from './ImageButton.style';

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
