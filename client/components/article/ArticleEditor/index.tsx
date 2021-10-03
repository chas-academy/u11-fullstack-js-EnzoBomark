import isHotkey from 'is-hotkey';
import pipe from 'lodash/fp/pipe';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { BaseEditor, createEditor, Descendant, Editor } from 'slate';
import { HistoryEditor, withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

import { Icon } from '@/assets/icons';
import ImageImportButton from '@/components/shared/buttons/ImageImportButton';
import { Element } from '@/components/shared/misc/Element';
import { Leaf } from '@/components/shared/misc/Leaf';
import Spinner from '@/components/shared/misc/Spinner';
import Form from '@/components/shared/templates/Form';
import Toolbar from '@/components/shared/templates/Toolbar';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import { Response } from '@/interfaces/Response.interface';
import { getDecendent } from '@/utils/descendantText.utils';
import { post } from '@/utils/http.utils';
import { toggleMark } from '@/utils/mark.utils';
import { getReadTime } from '@/utils/readTime.utils';
import { s3 } from '@/utils/s3.utils';
import { getTags } from '@/utils/tags.utils';

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

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const ArticleEditor: React.FC = () => {
  const router = useRouter();
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const [tags, setTags] = useState<string[]>();
  const [title, setTitle] = useState<string>();
  const [about, setAbout] = useState<string>();
  const [image, setImage] = useState<string>();
  const [body, setBody] = useState<Descendant[]>();
  const [readTime, setReadTime] = useState<number>();

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    post('article', { title, about, body, tags, image, readTime })
  );

  const onKeyDownHandler = (e) => {
    if (isHotkey('mod+b', e)) toggleMark(editor, 'bold');
    if (isHotkey('mod+i', e)) toggleMark(editor, 'italic');
    if (isHotkey('mod+u', e)) toggleMark(editor, 'underline');
    if (e.key === '#') Editor.addMark(editor, 'hashtag', true);
    if (e.key === ' ') Editor.removeMark(editor, 'hashtag');
    if (e.key === 'Enter') Editor.removeMark(editor, 'hashtag');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setTitle(getDecendent(value).shift().join(' '));
    setAbout(getDecendent(value).slice(1).join(' '));
    setReadTime(getReadTime(value));
    setTags(getTags(value));
    setBody(value.slice(1));
    await fetch();
  };

  useMount(() => {
    router.push('/');
  }, [data]);

  return (
    <S.ArticleEditor>
      <Spinner isLoading={isLoading} />
      <Slate editor={editor} value={value} onChange={(e) => setValue(e)}>
        <Toolbar />

        <Form onSubmit={submitHandler} error={hasError}>
          <S.TextField>
            <Editable
              id="body"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              autoCapitalize="false"
              autoCorrect="false"
              spellCheck="false"
              placeholder="Try write something..."
              onKeyDown={onKeyDownHandler}
            />
          </S.TextField>
          <ImageImportButton onChange={async (e) => setImage(await s3(e))} active={image} />
          <S.Submit>
            <Image src={Icon.Save} />
          </S.Submit>
        </Form>
      </Slate>
    </S.ArticleEditor>
  );
};

export default ArticleEditor;
