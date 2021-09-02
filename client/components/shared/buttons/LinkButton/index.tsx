import { S } from './LinkButton.style';
import { useSlateStatic } from 'slate-react';
import { insertLink } from '@/utils/slate/link.utils';
import { Icon } from '@/assets/icons';
import Image from 'next/image';

const LinkButton = () => {
  const editor = useSlateStatic();

  const insertLinkHandler = () => {
    const url = prompt('Enter a URL');
    insertLink(editor, url);
  };

  return (
    <S.LinkButton onClick={insertLinkHandler} aria-label="Insert Link" title="link">
      <Image src={Icon.Link} />
    </S.LinkButton>
  );
};
export default LinkButton;