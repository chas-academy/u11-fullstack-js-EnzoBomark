import { S } from './MarkButton.style';
import { useSlate } from 'slate-react';
import { toggleMark, isMarkActive } from '../../utils/mark.util';
import Image from 'next/image';

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();

  return (
    <S.Button
      aria-label={format}
      title={format}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {isMarkActive(editor, format) && (
        <S.IconActive>
          <Image src={icon} />
        </S.IconActive>
      )}

      {!isMarkActive(editor, format) && (
        <S.IconInActive>
          <Image src={icon} />
        </S.IconInActive>
      )}
    </S.Button>
  );
};

export default MarkButton;
