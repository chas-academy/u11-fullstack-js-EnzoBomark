import { Icon } from '@/assets/icons';

import BlockButton from '../../buttons/BlockButton';
import ImageButton from '../../buttons/ImageButton';
import LinkButton from '../../buttons/LinkButton';
import MarkButton from '../../buttons/MarkButton';
import { S } from './Toolbar.style';

const Toolbar = () => {
  return (
    <S.Toolbar>
      <MarkButton format="bold" icon={Icon.Bold} />
      <MarkButton format="italic" icon={Icon.Italic} />
      <MarkButton format="underline" icon={Icon.Underline} />
      <BlockButton format="list" icon={Icon.List} />
      <BlockButton format="heading" icon={Icon.HeadingOne} />
      <BlockButton format="subheading" icon={Icon.HeadingTwo} />
      <ImageButton />
      <LinkButton />
    </S.Toolbar>
  );
};

export default Toolbar;
