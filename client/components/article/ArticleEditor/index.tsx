import { S } from './ArticleEditor.style';
import { useState, useMemo, useCallback } from 'react';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';

import { useToggle } from '@/hooks/useToggle.hooks';

import pipe from 'lodash/fp/pipe';
import isHotkey from 'is-hotkey';

import { FormResponse } from '@/interfaces/FormResponse.interface';

import withImages from './plugins/withImages';
import withKeyCommands from './plugins/withKeyCommands';
import withLinks from './plugins/withLinks';

import { getReadTime } from '@/utils/readTime.utils';
import { toggleMark } from '@/utils/mark.utils';
import { post } from '@/utils/http.utils';

import Toolbar from '@/components/shared/templates/Toolbar';
import ImageImport from '@/components/shared/buttons/ImageImportButton';
import Post from '@/components/shared/buttons/PostButton';
import UnverifiedInput from '@/components/shared/inputs/UnverifiedInput';
import Modal from '@/components/shared/templates/Modal';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import AboutInput from '@/components/shared/inputs/AboutInput';
import TagsInput from '@/components/shared/inputs/TagsInput';
import { Element } from '@/components/shared/misc/Element';
import { Leaf } from '@/components/shared/misc/Leaf';
import Cookies from 'js-cookie';

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
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

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
      const response = await post<FormResponse>('article', article, {
        authorization: Cookies.get('access_token'),
        'x-refresh': Cookies.get('refresh_token'),
      });

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
