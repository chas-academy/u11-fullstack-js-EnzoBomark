import { S } from './ImageButton.style';
import { useSlateStatic } from 'slate-react';
import { insertImage } from '../../../utils/image.utils';
import { Icon } from '@/assets/icons';
import Image from 'next/image';

const ImageButton = () => {
  const editor = useSlateStatic();

  const insertImageHander = () => {
    const url = prompt('Enter an Image URL');
    insertImage(editor, url);
  };

  return (
    <S.Button onClick={insertImageHander} aria-label="Insert Image" title="image">
      <Image src={Icon.Image} />
    </S.Button>
  );
};

export default ImageButton;
