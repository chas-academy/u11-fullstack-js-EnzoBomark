import { S } from './MarkButton.style';
import { toggleMark, isMarkActive } from '@/utils/mark.utils';
import { useSlate } from 'slate-react';
import { MouseEvent } from 'react';
import Image from 'next/image';

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
