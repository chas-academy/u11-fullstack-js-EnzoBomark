import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';

import { Element } from '@/components/shared/misc/Element';
import { Leaf } from '@/components/shared/misc/Leaf';
import { IArticle } from '@/interfaces/Article.interface';

import { S } from './ArticleShowcase.style';

const TextEditor: React.FC<{ data: IArticle }> = (props: { data: IArticle }) => {
  const editor = useMemo(() => createEditor(), []);
  const [value, setValue] = useState<Descendant[]>(props.data.body);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <S.ArticleShowcase>
      <S.Title>{props.data.title}</S.Title>
      <S.Info>
        <S.P>{props.data.user.name}</S.P>
        <S.P>{props.data.updatedAt.substring(0, 10)}</S.P>
        <S.P>{props.data.readTime} min</S.P>
      </S.Info>

      <S.Image src={`${process.env.BASE_S3}${props.data.image}`} alt="Header Image" />

      <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <S.TextField>
          <Editable
            readOnly
            id="body"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoCapitalize="false"
            autoCorrect="false"
            spellCheck="false"
            title="Reader"
          />
        </S.TextField>
      </Slate>
    </S.ArticleShowcase>
  );
};

export default TextEditor;
