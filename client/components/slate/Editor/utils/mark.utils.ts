import { useSlate, ReactEditor } from 'slate-react';
import { Transforms, Editor } from 'slate';
import { HistoryEditor } from 'slate-history';

export const toggleMark = (editor: ReactEditor & HistoryEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: ReactEditor & HistoryEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
