import Image from 'next/image';
import { MouseEvent } from 'react';
import { useSlate } from 'slate-react';

import toggleBlock, { isBlockActive } from '@/utils/block.utils';

import { S } from './BlockButton.style';

interface Props {
  format: string;
  icon: string;
}
const BlockButton: React.FC<Props> = (props: Props) => {
  const editor = useSlate();

  return (
    <S.BlockButton
      type="button"
      active={isBlockActive(editor, props.format)}
      aria-label={props.format}
      title={props.format}
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleBlock(editor, props.format);
      }}
    >
      <Image src={props.icon} />
    </S.BlockButton>
  );
};

export default BlockButton;
