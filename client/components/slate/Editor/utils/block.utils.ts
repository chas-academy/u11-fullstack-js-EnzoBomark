import { useSlate, ReactEditor } from 'slate-react';
import { Transforms, Editor, Element } from 'slate';
import { HistoryEditor } from 'slate-history';

export const toggleBlock = (editor: ReactEditor & HistoryEditor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = 'list'.includes(format);

  Transforms.unwrapNodes(editor, {
    // @ts-ignore
    match: (n) => 'list'.includes(!Editor.isEditor(n) && Element.isElement(n) && n.type),
    split: true,
  });
  const newProperties: any = {
    type: isActive ? 'paragraph' : isList ? 'list' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isBlockActive = (editor: ReactEditor & HistoryEditor, format: string) => {
  const [match] = Editor.nodes(editor, {
    // @ts-ignore
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  });

  return !!match;
};
