import { S } from './MarkButton.style';
import { useSlate } from 'slate-react';
import { toggleMark, isMarkActive } from '../../../utils/mark.utils';
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
        <S.Active>
          <Image src={icon} />
        </S.Active>
      )}

      {!isMarkActive(editor, format) && (
        <S.Inactive>
          <Image src={icon} />
        </S.Inactive>
      )}
    </S.Button>
  );
};

export default MarkButton;
