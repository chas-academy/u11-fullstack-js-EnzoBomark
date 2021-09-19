import { useState, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import pipe from 'lodash/fp/pipe';

import withImages from '../Editor/plugins/withImages';
import withKeyCommands from '../Editor/plugins/withKeyCommands';
import withLinks from '../Editor/plugins/withLinks';

import { S } from './Reader.style';

const createEditorWithPlugins = pipe(
  withReact,
  withHistory,
  withImages,
  withLinks,
  withKeyCommands
);

interface Props {
  initialValue: any;
}

const TextEditor: React.FC<Props> = (props: Props) => {
  const editor = useMemo(() => createEditor(), []);
  const [value, setValue] = useState<Descendant[]>(props.initialValue);

  return (
    <S.Editor>
      <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <S.TextField>
          <Editable
            readOnly
            id="body"
            autoCapitalize="false"
            autoCorrect="false"
            spellCheck="false"
            title="Reader"
          />
        </S.TextField>
      </Slate>
    </S.Editor>
  );
};

export default TextEditor;
