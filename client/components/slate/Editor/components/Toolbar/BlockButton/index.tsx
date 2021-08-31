import { S } from './BlockButton.style';
import { useSlate } from 'slate-react';
import { toggleBlock, isBlockActive } from '../../../utils/block.utils';
import Image from 'next/image';

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();

  return (
    <S.Button
      aria-label={format}
      title={format}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {isBlockActive(editor, format) && (
        <S.Active>
          <Image src={icon} />
        </S.Active>
      )}

      {!isBlockActive(editor, format) && (
        <S.Inactive>
          <Image src={icon} />
        </S.Inactive>
      )}
    </S.Button>
  );
};

export default MarkButton;
