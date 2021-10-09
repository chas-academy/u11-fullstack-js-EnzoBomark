import isHotkey from 'is-hotkey';
import pipe from 'lodash/fp/pipe';
import Image from 'next/image';
import React, { useCallback, useMemo } from 'react';
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
import toggleMark from '@/utils/mark.utils';

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

interface Props {
  error: string;
  onSubmit: (e) => void;
  onChange: (e) => void;
  imageImport: (e) => void;
  image: string;
  value: Descendant[];
}

const ArticleEditor: React.FC<Props> = (props: Props) => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const onKeyDownHandler = (e) => {
    if (isHotkey('mod+b', e)) toggleMark(editor, 'bold');
    if (isHotkey('mod+i', e)) toggleMark(editor, 'italic');
    if (isHotkey('mod+u', e)) toggleMark(editor, 'underline');
    if (e.key === '#') Editor.addMark(editor, 'hashtag', true);
    if (e.key === ' ') Editor.removeMark(editor, 'hashtag');
    if (e.key === 'Enter') Editor.removeMark(editor, 'hashtag');
  };

  const imageImport = (e) => {
    props.imageImport(e);
  };

  return (
    <S.ArticleEditor>
      <Slate editor={editor} value={props.value} onChange={(e) => props.onChange(e)}>
        <Toolbar />

        <Form onSubmit={(e) => props.onSubmit(e)} error={props.error}>
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
          <ImageImportButton onChange={(e) => props.imageImport(e)} active={props.image} />
          <S.Submit>
            <Image src={Icon.Save} />
          </S.Submit>
        </Form>
      </Slate>
    </S.ArticleEditor>
  );
};

export default ArticleEditor;
