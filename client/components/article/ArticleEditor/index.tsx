import isHotkey from 'is-hotkey';
import pipe from 'lodash/fp/pipe';
import React, { useCallback, useMemo, useState } from 'react';
import { BaseEditor, createEditor, Descendant, Editor } from 'slate';
import { HistoryEditor, withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

import { Element } from '@/components/shared/misc/Element';
import { Leaf } from '@/components/shared/misc/Leaf';
import Toolbar from '@/components/shared/templates/Toolbar';
import { toggleMark } from '@/utils/mark.utils';

import { S } from './ArticleEditor.style';
import withImages from './plugins/withImages';
import withKeyCommands from './plugins/withKeyCommands';
import withLinks from './plugins/withLinks';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
  }
}

const createEditorWithPlugins = pipe(
  withReact,
  withHistory,
  withImages,
  withLinks,
  withKeyCommands
);

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
};

const initialValue = [
  {
    type: 'heading',
    children: [{ text: '' }],
  },
];

interface Props {
  onChange: (e) => void;
  image: string;
}

const ArticleEditor: React.FC<Props> = (props) => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <S.ArticleEditor>
      <Slate
        editor={editor}
        value={value}
        onChange={(e) => {
          setValue(e);
          props.onChange(e);
        }}
      >
        <Toolbar />

        {props.image && <S.Image src={`${process.env.BASE_S3}${props.image}`} alt="Header Image" />}

        <S.TextField>
          <Editable
            id="body"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoCapitalize="false"
            autoCorrect="false"
            spellCheck="false"
            title="Editor"
            placeholder="Write your Title..."
            onKeyDown={(event) => {
              Object.keys(HOTKEYS).map(
                (hotkey) => isHotkey(hotkey, event as any) && toggleMark(editor, HOTKEYS[hotkey])
              );
              if (event.key === '#') Editor.addMark(editor, 'hashtag', true);
              if (event.key === ' ' || event.key === 'Enter') Editor.removeMark(editor, 'hashtag');
            }}
          />
        </S.TextField>
      </Slate>
    </S.ArticleEditor>
  );
};

export default ArticleEditor;
