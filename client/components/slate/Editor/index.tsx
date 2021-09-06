import { useState, useMemo, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import pipe from 'lodash/fp/pipe';
import isHotkey from 'is-hotkey';

import Toolbar from '../../shared/slate/Toolbar';

import { FormResponse } from '@/interfaces/FormResponse.interface';

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
import { post } from '@/utils/rest/http.utils';

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
    children: [{ text: '' }],
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

interface Article {
  title: string;
  image: string;
  body: Descendant[];
}

const TextEditor: React.FC = () => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const [article, setArticle] = useState<Article>({
    title: undefined,
    image: undefined,
    body: undefined,
  });

  const addNewArticle = async (event: React.FormEvent) => {
    event.preventDefault();

    if (article.body === undefined) alert('No body');
    if (article.title === undefined) alert('No title');
    if (article.image === undefined) alert('No image');

    const isVerified =
      article.body !== undefined && article.title !== undefined && article.image !== undefined;

    if (isVerified) {
      const response = await post<FormResponse>('article', article);

      if (!response.ok) {
        return console.log(response.parsedBody?.error);
      }

      console.log(response.parsedBody?.success);
    }
  };

  const getTitle = (e) => setArticle({ ...article, title: e });
  const getImageKey = (e) => setArticle({ ...article, image: e });
  const getBody = (e) => setArticle({ ...article, body: e });

  return (
    <S.Editor>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value);
          getBody(value);
        }}
      >
        <Toolbar />

        <S.Form onSubmit={addNewArticle}>
          <UnverifiedInput placeholder="Title" getState={getTitle} />
          <ImageImport getState={getImageKey} id="image" />
          <Post />
        </S.Form>

        <S.TextField>
          <Editable
            id="body"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoCapitalize="false"
            autoCorrect="false"
            spellCheck="false"
            title="Editor"
            placeholder="Write here..."
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
