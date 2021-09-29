import Image from 'next/image';
import { MouseEvent } from 'react';
import { useSlate } from 'slate-react';

import { isMarkActive, toggleMark } from '@/utils/mark.utils';

import { S } from './MarkButton.style';

const BlockButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();

  return (
    <S.MarkButton
      active={isMarkActive(editor, format)}
      aria-label={format}
      title={format}
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Image src={icon} />
    </S.MarkButton>
  );
};

export default BlockButton;
