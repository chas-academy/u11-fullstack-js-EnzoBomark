import { S } from './ArticleShowcase.style';
import { useState, useMemo, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable } from 'slate-react';
import { Element } from '@/components/shared/misc/Element';
import { Leaf } from '@/components/shared/misc/Leaf';
import { IArticle } from '@/interfaces/Article.interface';

const TextEditor: React.FC<{ data: IArticle }> = (props: { data: IArticle }) => {
  const editor = useMemo(() => createEditor(), []);
  const [value, setValue] = useState<Descendant[]>(props.data.body);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <S.ArticleShowcase>
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
