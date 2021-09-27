import { S } from './ArticleEditor.style';
import { useState, useMemo, useCallback } from 'react';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import pipe from 'lodash/fp/pipe';
import isHotkey from 'is-hotkey';
import withImages from './plugins/withImages';
import withKeyCommands from './plugins/withKeyCommands';
import withLinks from './plugins/withLinks';
import Toolbar from '@/components/shared/templates/Toolbar';
import { toggleMark } from '@/utils/mark.utils';
import { Element } from '@/components/shared/misc/Element';
import { Leaf } from '@/components/shared/misc/Leaf';

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
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  toggleMark(editor, HOTKEYS[hotkey]);
                }
              }
            }}
          />
        </S.TextField>
      </Slate>
    </S.ArticleEditor>
  );
};

export default ArticleEditor;
