import Image from 'next/image';
import { MouseEvent } from 'react';
import { useSlate } from 'slate-react';

import toggleMark, { isMarkActive } from '@/utils/mark.utils';

import { S } from './MarkButton.style';

interface Props {
  format: string;
  icon: string;
}

const BlockButton: React.FC<Props> = (props: Props) => {
  const editor = useSlate();

  return (
    <S.MarkButton
      type="button"
      active={isMarkActive(editor, props.format)}
      aria-label={props.format}
      title={props.format}
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleMark(editor, props.format);
      }}
    >
      <Image src={props.icon} />
    </S.MarkButton>
  );
};

export default BlockButton;
