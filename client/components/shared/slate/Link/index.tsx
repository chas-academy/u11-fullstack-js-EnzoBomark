import { useFocused, useSelected, useSlateStatic } from 'slate-react';

import { removeLink } from '@/utils/link.utils';

import { S } from './Link.style';

const Link = ({ attributes, element, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <S.Link>
      <a {...attributes} href={element.href}>
        {children}
      </a>
      {selected && focused && (
        <S.Popup contentEditable={false}>
          <a href={element.href} rel="noreferrer" target="_blank">
            {element.href}
          </a>
          <button onClick={() => removeLink(editor)}>Remove</button>
        </S.Popup>
      )}
    </S.Link>
  );
};

export default Link;
