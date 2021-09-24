import { useSelected, useFocused, useSlateStatic } from 'slate-react';
import { removeLink } from '@/utils/link.utils';

const Link = ({ attributes, element, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div className="element-link">
      <a {...attributes} href={element.href}>
        {children}
      </a>
      {selected && focused && (
        <div className="popup" contentEditable={false}>
          <a href={element.href} rel="noreferrer" target="_blank">
            {element.href}
          </a>
          <button onClick={() => removeLink(editor)}>Link</button>
        </div>
      )}
    </div>
  );
};

export default Link;
