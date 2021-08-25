import { useSlate } from 'slate-react';
import { toggleMark, isMarkActive } from '../../utils/mark.util';

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <div className={isMarkActive(editor, format) ? 'active' : ''}> A{icon}</div>
    </button>
  );
};

export default MarkButton;
