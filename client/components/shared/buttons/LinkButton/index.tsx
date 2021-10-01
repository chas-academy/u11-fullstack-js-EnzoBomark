import Image from 'next/image';
import { useSlateStatic } from 'slate-react';

import { Icon } from '@/assets/icons';
import { insertLink } from '@/utils/link.utils';

import { S } from './LinkButton.style';

const LinkButton = () => {
  const editor = useSlateStatic();

  const insertLinkHandler = () => {
    const url = prompt('Enter a URL');
    insertLink(editor, url);
  };

  return (
    <S.LinkButton type="button" onClick={insertLinkHandler} aria-label="Insert Link" title="link">
      <Image src={Icon.Link} />
    </S.LinkButton>
  );
};
export default LinkButton;
