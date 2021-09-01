import { S } from './BlockButton.style';
import { toggleBlock, isBlockActive } from '@/utils/slate/block.utils';
import { useSlate } from 'slate-react';
import { MouseEvent } from 'react';
import Image from 'next/image';

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
