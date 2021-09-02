import { useState, useMemo, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import pipe from 'lodash/fp/pipe';
import isHotkey from 'is-hotkey';

import Toolbar from '../../shared/slate/Toolbar';

import Paragraph from './elements/Paragraph';
import Image from './elements/Image';
import Link from './elements/Link';

import withImages from './plugins/withImages';
import withKeyCommands from './plugins/withKeyCommands';
import withLinks from './plugins/withLinks';

import { createParagraphNode } from '@/utils/slate/paragraph.utils';
import { createImageNode } from '@/utils/slate/image.utils';
import { createLinkNode } from '@/utils/slate/link.utils';
import { toggleMark } from '@/utils/slate/mark.utils';

import { S } from './TextEditor.style';
import List from './elements/List';
import Heading from './elements/Heading';
import Subheading from './elements/Subheading';

import ImageImport from '@/components/shared/buttons/ImageImport';
import Post from '@/components/shared/buttons/Post';
import UnverifiedInput from '@/components/shared/inputs/UnverifiedInput';

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
    type: 'paragraph',
    children: [{ text: 'Write something!' }],
  },
];

const Element = (props) => {
  const type = props.element.type;
  if (type === 'image') return <Image {...props} />;
  if (type === 'link') return <Link {...props} />;
  if (type === 'list') return <List {...props} />;
  if (type === 'heading') return <Heading {...props} />;
  if (type === 'subheading') return <Subheading {...props} />;
  return <Paragraph {...props} />;
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};

const TextEditor = () => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <S.Editor>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value);

          console.log(value);
          // Save the value to Redux.
          const content = JSON.stringify(value);
          localStorage.setItem('article', content);
        }}
      >
        <Toolbar />

        <S.Form>
          <UnverifiedInput placeholder="Title" />
          <ImageImport />
          <Post />
        </S.Form>

        <S.TextField>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoCapitalize="false"
            autoCorrect="false"
            spellCheck="false"
            title="Editor"
            placeholder="Enter some rich text…"
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
    </S.Editor>
  );
};

export default TextEditor;
