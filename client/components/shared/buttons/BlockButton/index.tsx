import Image from 'next/image';
import { MouseEvent } from 'react';
import { useSlate } from 'slate-react';

import { isBlockActive, toggleBlock } from '@/utils/block.utils';

import { S } from './BlockButton.style';

const BlockButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();

  return (
    <S.BlockButton
      active={isBlockActive(editor, format)}
      aria-label={format}
      title={format}
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Image src={icon} />
    </S.BlockButton>
  );
};

export default BlockButton;
