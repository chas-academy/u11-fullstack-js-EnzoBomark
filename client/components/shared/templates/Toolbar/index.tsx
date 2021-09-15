import { S } from './Toolbar.style';
import LinkButton from '../../buttons/LinkButton';
import MarkButton from '../../buttons/MarkButton';
import ImageButton from '../../buttons/ImageButton';
import BlockButton from '../../buttons/BlockButton';
import { Icon } from '@/assets/icons';

const Toolbar = () => {
  return (
    <S.Toolbar>
      <MarkButton format="bold" icon={Icon.Bold} />
      <MarkButton format="italic" icon={Icon.Italic} />
      <MarkButton format="underline" icon={Icon.Underline} />
      <BlockButton format="list" icon={Icon.List} />
      <BlockButton format="heading" icon={Icon.Heading} />
      <BlockButton format="subheading" icon={Icon.Heading} />
      <ImageButton />
      <LinkButton />
    </S.Toolbar>
  );
};

export default Toolbar;
