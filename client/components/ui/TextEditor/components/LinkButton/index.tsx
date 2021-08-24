import { useSlateStatic } from 'slate-react';
import { insertLink } from '../../utils/link';

const LinkButton = () => {
  const editor = useSlateStatic();

  const insertLinkHandler = () => {
    const url = prompt('Enter a URL');
    insertLink(editor, url);
  };

  return (
    <button onClick={insertLinkHandler} aria-label="Insert Link" title="Link">
      link
    </button>
  );
};
export default LinkButton;
