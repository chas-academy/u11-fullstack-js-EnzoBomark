import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';

import { Element } from '@/components/shared/misc/Element';
import { Leaf } from '@/components/shared/misc/Leaf';
import { IArticle } from '@/interfaces/Article.interface';

import { S } from './ArticleShowcase.style';

const TextEditor: React.FC<{ data: IArticle }> = ({ data }) => {
  const editor = useMemo(() => createEditor(), []);
  const [value, setValue] = useState<Descendant[]>(data.body.slice(1));
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <S.ArticleShowcase>
      <S.Title>{data.title}</S.Title>
      <S.Info>
        <S.P>{data.user.name}</S.P>
        <S.P>{data.updatedAt.substring(0, 10)}</S.P>
        <S.P>{data.readTime} min</S.P>
      </S.Info>

      <S.Image src={`${process.env.BASE_S3}${data.image}`} alt="Header Image" />

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
