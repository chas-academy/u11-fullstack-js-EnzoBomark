import { S } from './ArticleEditor.style';
import { useState, useMemo, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { useToggle } from '@/hooks/useToggle.hooks';

import pipe from 'lodash/fp/pipe';
import isHotkey from 'is-hotkey';

import Toolbar from '../../shared/templates/Toolbar';

import { FormResponse } from '@/interfaces/FormResponse.interface';

import Paragraph from './elements/Paragraph';
import Image from './elements/Image';
import Link from './elements/Link';

import withImages from './plugins/withImages';
import withKeyCommands from './plugins/withKeyCommands';
import withLinks from './plugins/withLinks';

// import { createParagraphNode } from '@/utils/slate/paragraph.utils';
// import { createImageNode } from '@/utils/slate/image.utils';
// import { createLinkNode } from '@/utils/slate/link.utils';
import { getReadTime } from '@/utils/slate/readTime.utils';
import { toggleMark } from '@/utils/slate/mark.utils';
import { post } from '@/utils/rest/http.utils';

import List from './elements/List';
import Heading from './elements/Heading';
import Subheading from './elements/Subheading';

import ImageImport from '@/components/shared/buttons/ImageImportButton';
import Post from '@/components/shared/buttons/PostButton';
import UnverifiedInput from '@/components/shared/inputs/UnverifiedInput';
import Modal from '@/components/shared/templates/Modal';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import AboutInput from '@/components/shared/inputs/AboutInput';
import TagsInput from '@/components/shared/inputs/TagsInput';

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
  tags: string[];
  about: string;
  readTime: number;
}

const ArticleEditor: React.FC = () => {
  const [isOpen, setIsOpen] = useToggle(false);
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const [article, setArticle] = useState<Article>({
    title: undefined,
    image: undefined,
    body: undefined,
    tags: undefined,
    about: undefined,
    readTime: undefined,
  });

  const addNewArticle = async (event: React.FormEvent) => {
    event.preventDefault();
    if (article.body === undefined) alert('No body');
    if (article.title === undefined) alert('No title');
    if (article.image === undefined) alert('No image');
    if (article.about === undefined) alert('No about');
    if (article.tags === undefined) alert('No tags');

    const isVerified =
      article.body !== undefined &&
      article.title !== undefined &&
      article.image !== undefined &&
      article.tags !== undefined &&
      article.about !== undefined;

    if (isVerified) {
      article.readTime = getReadTime(article.body);
      const response = await post<FormResponse>('article', article);

      if (!response.ok) {
        // return console.log(response.parsedBody?.error);
      }

      // console.log(response.parsedBody?.success);
    }
  };

  const getTitle = (e) => setArticle({ ...article, title: e });
  const getImageKey = (e) => setArticle({ ...article, image: e });
  const getBody = (e) => setArticle({ ...article, body: e });
  const getTags = (e) => setArticle({ ...article, tags: e });
  const getAbout = (e) => setArticle({ ...article, about: e });

  return (
    <S.ArticleEditor>
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
          <Modal open={isOpen} close={() => setIsOpen(false)}>
            <S.ModalContent>
              <ImageImport id="image" getState={getImageKey} />
              <AboutInput getState={getAbout} />
              <TagsInput getState={getTags} />
              <SubmitButton onClick={addNewArticle}>Confirm</SubmitButton>
            </S.ModalContent>
          </Modal>
          <Post open={() => setIsOpen(true)} />
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
    </S.ArticleEditor>
  );
};

export default ArticleEditor;
