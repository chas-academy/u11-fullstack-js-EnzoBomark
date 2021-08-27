import { S } from './LinkButton.style';
import { useSlateStatic } from 'slate-react';
import { insertLink } from '../../utils/link';
import { Icon } from '@/assets/icons';
import Image from 'next/image';

const LinkButton = () => {
  const editor = useSlateStatic();

  const insertLinkHandler = () => {
    const url = prompt('Enter a URL');
    insertLink(editor, url);
  };

  return (
    <S.Button onClick={insertLinkHandler} aria-label="Insert Link" title="Link">
      <Image src={Icon.Link} />
    </S.Button>
  );
};
export default LinkButton;
